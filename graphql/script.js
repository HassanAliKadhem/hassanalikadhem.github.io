// https://learn.reboot01.com/graphiql
const loginDialog = document.getElementsByTagName("dialog")[0]; // get the login dialog
loginDialog.children.item(0).addEventListener("submit", event => { // catch the form submit event
    event.preventDefault();
    try {
        const data = new FormData(event.target);
        getToken(data.get("user"), data.get("pass")).then(newToken => {
            if (newToken != "" && !newToken.startsWith("error:")) { // if the token return is empty then an error happened
                token = newToken;
                getData(token);
                loginDialog.close();
                event.target.reset();
            } else {
                alert(newToken);
            }
        });
    } catch (error) {
        console.log(error);
    }
    return false;
});
loginDialog.showModal(); // show the login dialog

function logOut() { // reset the content div and shop login dialog
    contentDiv.innerHTML = "";
    loginDialog.showModal();
}

let token;
async function getToken(user, pass) { // fetches the JWT token from the login endpoint
    try {
        let newToken = "";
        let response = await fetch(`https://learn.reboot01.com/api/auth/signin`, {
            method: "POST",
            headers: {
                Authorization: `basic ${btoa(user + ":" + pass)}`, // will convert user and password to base 64
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        newToken = await response.json();
        if (newToken.error) {
            console.error(newToken.error);
            return "error: " + newToken.error;
        }
        return newToken;
    } catch (error) {
        console.error(error);
        return "error: " + error;
    }
}

async function getData(token) {
    await fetch(`https://learn.reboot01.com/api/graphql-engine/v1/graphql`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`, // use the jwt token
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // the graphql query
            query: `query {
                        user {
                            id
                            login
                            email
                            firstName
                            lastName
                            campus
                            progresses(where: {isDone: { _eq:true}}) {
                            createdAt
                            path
                            results {
                                id
                                grade
                            }
                            }
                            progressesByPath {
                            count
                            createdAt
                            path
                            succeeded
                            }
                            xps {
                            amount
                            originEventId
                            event {
                                createdAt
                            }
                            path
                            }
                            audits(where:{auditedAt:{_is_null: false}}) {
                            id
                            auditedAt
                            grade
                            group {
                                captainLogin
                                members {
                                userLogin
                                }
                            }
                            }
                            
                        }
                    }`
        })
    }).then(response => {
        response.json().then(json => {
            console.log(json);
            if (json.errors && json.errors.length > 0) { // if errors returned then show them
                console.error(json.errors);
                json.errors.forEach(error => {
                    console.error(error);
                    alert(error);
                });
            } else {
                console.log(json.data)
                showData(json.data);
            }
        });

    }).catch(error => {
        console.error(error);
    });
}

const contentDiv = document.getElementById("content");
function addSection(section) {
    section.classList.add("section");
    section.open = true;
    contentDiv.appendChild(section);
}
function showData(data) {
    let user = data.user[0];
    // user information
    let userInfoSection = document.createElement("div");
    userInfoSection.innerHTML = `<summary>User Info</summary><br>ID: ${user.id}<br>
    Username: ${user.login}<br>
    Name: ${user.firstName} ${user.lastName}<br>
    Campus: ${user.campus}`;
    addSection(userInfoSection);


    // user progress by path
    let paths = {};
    user.progresses.forEach(progress => {
        paths[progress.path] = progress;
    });
    // check if path is successful
    user.progressesByPath.forEach(byPath => {
        if (paths[byPath.path] != null) {
            paths[byPath.path].succeeded = byPath.succeeded;
        }
    });


    let totalPiscine = 0;
    let totalModule = 0;
    let xpPerMonth = {};
    // get the xp for each bath
    user.xps.forEach(xp => {
        if (xp.path.includes("piscine")) {
            totalPiscine += xp.amount;
        } else {
            totalModule += xp.amount;
        }
        paths[xp.path].xp = xp.amount;
        let yearMonth = paths[xp.path].createdAt.substring(0, 7);
        if (xpPerMonth[yearMonth] === undefined) {
            xpPerMonth[yearMonth] = { amount: 0 };
        }
        xpPerMonth[yearMonth].amount += xp.amount;
    });
    let pathInfoSection = document.createElement("div");
    pathInfoSection.classList.add("overflow");
    let pathInfo = "Progress - Total XP: " + humanSize(totalModule + totalPiscine) + ", Piscine XP: " + humanSize(totalPiscine) + ", Projects XP: " + humanSize(totalModule);
    Object.values(paths).forEach(path => {
        if (path.xp) {
            pathInfo += `<hr>
            Path: ${path.path} <br>
            XP: ${humanSize(path.xp)}<br>
            Grade: ${path.results.length > 0 ? path.results[0].grade : "0"}<br>
            `;
        }
    });
    pathInfoSection.innerHTML = pathInfo;
    let xps = [];
    Object.keys(xpPerMonth).forEach(key => {
        xps.push([key, xpPerMonth[key].amount]);
    });
    xps.sort((a, b) => a[0] < b[0] ? -1 : 1);
    addSection(createLineChart(xps));
    addSection(pathInfoSection);

    let auditInfoSection = document.createElement("div");
    auditInfoSection.classList.add("overflow");
    let auditInfo = `Audits - Total audits: ${user.audits.filter(audit => audit.auditedAt).length}, Passes: ${user.audits.filter(audit => audit.grade >= 1).length}, Fails: ${user.audits.filter(audit => audit.grade < 1).length}`;
    let auditPasses = 0;
    let auditFails = 0;
    user.audits.forEach(audit => {
        if (audit.auditedAt) {
            auditInfo += `<hr>
            Audited At: ${audit.auditedAt.replaceAll("-", "/").replace("T", " ").split(".")[0]}<br>
            Pass: ${audit.grade == 1 ? "yes" : "no"}<br>
            Group Members: ${audit.group.members.map(member => member.userLogin == audit.group.captainLogin ? "<span style='color:gold;'>" + member.userLogin + "</span>" : member.userLogin).join(", ")}<br>
            `;
            if (audit.grade >= 1) {
                auditPasses++;
            } else {
                auditFails++;
            }
        }
    });
    auditInfoSection.innerHTML = auditInfo;
    addSection(createPieChart(auditPasses, auditFails));
    addSection(auditInfoSection);
}

function humanSize(amount) { // convert from bytes to a human readable format
    if (amount > 1000000) {
        return (amount / 1000000).toFixed(2) + " MB";
    } else if (amount > 1000) {
        return (amount / 1000).toFixed(2) + " KB";
    } else {
        return amount + " Byte";
    }
}

function createSvgElement(type) {
    return document.createElementNS("http://www.w3.org/2000/svg", type);
}

function createLineChart(data) {
    let size = 400;
    const div = document.createElement("div");
    div.innerHTML = "Xp per month chart";
    const container = document.createElement("div");
    div.appendChild(container);
    if (data.length > 1) {
        container.style.position = "relative";
        container.style.margin = "1%";

        const svgContainer = createSvgElement("svg");
        svgContainer.setAttributeNS(null, "viewBox", "0 0 400 400");
        const width = size / data.length;
        let smallest = data[0][1];
        let biggest = smallest;
        data.forEach(point => {
            if (point[1] < smallest) {
                smallest = point[1];
            }
            if (point[1] > biggest) {
                biggest = point[1];
            }
        });

        for (let i = 1; i < data.length; i++) {
            let line = createSvgElement("line");
            line.setAttribute("stroke", "white");
            line.setAttribute("x1", width * (i - 1));
            line.setAttribute("y1", (1 - data[i - 1][1] / biggest) * 400);
            line.setAttribute("x2", width * i);
            line.setAttribute("y2", (1 - data[i][1] / biggest) * 400);
            svgContainer.appendChild(line);

            let label = document.createElement("div");
            label.classList.add("legend");
            label.style.left = `${(width * i / size * 100)}%`;
            label.innerHTML = data[i][0];
            container.appendChild(label);

            let label2 = document.createElement("div");
            label2.classList.add("label");
            label2.style.left = `${(width * i / size * 100)}%`;
            label2.style.bottom = `${Math.max(Math.min(data[i][1] / biggest * 100, 98), 1)}%`;
            label2.innerHTML = data[i][1];
            container.appendChild(label2);
        }
        container.prepend(svgContainer);
    }
    return div;
}

// can only take two value
function createPieChart(passes, fails) {
    let size = 400;
    const div = document.createElement("div");
    div.innerHTML = "Audit ration chart";
    const container = document.createElement("div");
    div.appendChild(container);
    container.style.position = "relative";
    container.style.margin = "1%";

    const svgContainer = createSvgElement("svg");
    svgContainer.setAttributeNS(null, "viewBox", "0 0 400 400");

    let circle = createSvgElement("circle");
    circle.setAttribute("cx", size / 2);
    circle.setAttribute("cy", size / 2);
    circle.setAttribute("r", size / 2);
    circle.setAttribute("fill", "green");
    svgContainer.appendChild(circle);

    let semiCircle = createSvgElement("circle");
    semiCircle.setAttribute("cx", size / 2);
    semiCircle.setAttribute("cy", size / 2);
    semiCircle.setAttribute("r", size / 4);
    semiCircle.setAttribute("fill", "transparent");
    semiCircle.setAttribute("stroke", "tomato");
    semiCircle.setAttribute("stroke-width", size / 2);
    semiCircle.setAttribute("transform", "rotate(-90) translate(-" + size + ")");
    let circumference = Math.PI * size / 2;
    semiCircle.setAttribute("stroke-dasharray", (fails / (fails + passes)) * circumference + " " + circumference);
    svgContainer.appendChild(semiCircle);

    let legend = document.createElement("div");
    legend.classList.add("legend");
    legend.style.left = `50%`;
    legend.style.bottom = "-2.5%"
    legend.innerHTML = "<span style='color:green;'>Passes: " + passes + "</span> / <span style='color:tomato;'>Fails: " + fails + "</span>";
    container.appendChild(legend);

    container.prepend(svgContainer);
    return div;
}