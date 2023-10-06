var targetDiv = document.getElementById("CV");

if (targetDiv !== null) { // check if the cv page
    class Section {
        constructor(titleEng, contentEng, titleArb, contentArb, imgLink, imgAlt) {
            this.titleEng = titleEng;
            this.contentEng = contentEng;
            this.titleArb = titleArb;
            this.contentArb = contentArb;
            this.imgLink = imgLink;
            this.imgAlt = imgAlt;
        }
    }

    const sections = [
        new Section("About Me", "Grew Up in A'ali and still live there", "نبذة عني", "ولدت في قرية عالي", "Hasan.jpg", "My picture"),
        new Section("Education",
            `<strong>Bahrain Polytechnic</strong> / Bachelorette in Information technology,
    Majored in programming
    <h6>2016 - 2021</h6>
    <strong>Bait al Talieam</strong> / English Language Courses
        <h6>2008 - 2009</h6>`,
            "التعليم",
            `<strong>بوليتكنك البحرين</strong> / بكلوريوس تكنولوجية المعلومات تخصص في البرمجة
        <h6>2016 - 2021</h6>
        <strong>بيت التعليم</strong> / دورات الغة الانجليزية
        <h6>2008 - 2009</h6>`,
            "Polytechnic.jpg", "Bahrain Polytechnic"),
        new Section("Skills",
            `<strong>Java</strong> / CLI and GUI desktop applications<br>
        <strong>PHP</strong> / Web apps<br>
        <strong>C#</strong> / CLI, GUI, Games and Web apps using ASP.NET<br>
        <strong>Python</strong> / CLI applications and API<br>
        <strong>Swift</strong> / IOS Applications<br>
        <strong>Flutter</strong> / mobile application<br>
        <strong>MySQL and SQLServer</strong><br>
        <strong>AWS</strong> / Lambda, RDS, DeepLens, Apigateway and Lightsail<br>
        <strong>Unity (Game Engine)</strong> / Beginner game developer<br>
        <strong>Godot (Game Engine)</strong> / Beginner game developer<br>
        <strong>Arabic</strong> / Mother tongue<br>
        <strong>English</strong> / Great language knowledge<br>
        <strong>Microsoft office</strong> / Word, Excel and Powerpoint<br>`,
            "المهارات",
            `<strong>Java</strong> / تطبيقات الحاسوب<br>
        <strong>PHP</strong> / تطبيقات المتصفح<br>
        <strong>#C</strong> / تطبيقات الحاسوب و المتصفح والالعاب<br>
        <strong>Python</strong> / تطبيقات الحاسوب و API<br>
        <strong>Swift</strong> / تطبيقات الهاتف<br>
        <strong>Flutter</strong> / تطبيقات الهاتف<br>
        <strong>MySQL and SQLServer</strong><br>
        <strong>AWS</strong> / Lambda, RDS, DeepLens, Apigateway و Lightsail<br>
        <strong>Unity (Game Engine)</strong> / صناعة الالعاب<br>
        <strong>Godot (Game Engine)</strong> / صناعة الالعاب<br>
        <strong>Arabic</strong> / اللغة الام<br>
        <strong>English</strong> / معرفة عالية<br>
        <strong>Microsoft office</strong> / Word, Excel و Powerpoint<br>`,
            "Skills.jpg", "Puzzle piece that says skills"),
        new Section("Experience",
            `<strong>Computer World(Contracted To Gulf Air)</strong> / Software Developer
        <h6>September 2022 - February 2023</h6>
        <ul>
        <li>Develop and test new software solutions for business users</li>
        <li>Provide technical support for existing applications</li>
        <li>Further develop existing applications with added features based on business user’s requests</li>
        </ul>
        <strong>AWS</strong> / Software Developer (Work placement for graduation project)
        <h6>April 2021 - June 2021</h6>
        <ul>
        <li>Create a machine learning centered project for AWS as my graduation project to track badminton player's score</li>
        <li>take advantage of various AWS services(SageMaker, Lambda, RDS, Deeplens, Apigateway and Lightsail)</li>
        </ul>
        <strong>Cineco</strong> / Guide (Usher) at Seef mall cinema
        <h6>April 2015 - September 2022</h6>
        <ul>
        <li>Helping the customers find their seats</li>
        <li>Make sure the cinema theater experience remains enjoyable</li>
        <li>dealing with rowdy customers that ruin the experience for others</li>
        <!-- <li>Provide customer service to the cinema patrons</li> -->
        </ul>`,
            "الخبرة",
            `<strong>Computer World(Contracted To Gulf Air)</strong> / مبرمج حاسوب
        <h6>سبتمبر 2022 - فبراير 2023</h6>
        <ul>
            <li>صناعة التطبيقات بنائا على متطلبات المستخدمين </li>
            <li>حل المشاكل في التطبيقات</li>
            <li>تحديث و اضافة مميزات جديدة الى التطبيقات</li>
            </ul>
            <strong>AWS</strong> / مبرمج حاسوب (مشروع التخرج)
            <h6>ابريل 2021 - جون 2021</h6>
            <ul>
            <li>صناعة تطبيق ذكي يتابع لاعب الريشة بكاميرة ذكية لكي يسجل النقاط</li>
            <li>استخدم خدمات من AWS <br /> SageMaker, Lambda, RDS, Deeplens, ApiGateway, Lightsail</li>
            </ul>
            <strong>Cineco</strong> / مرشد في سينما مجمع السيف
            <h6>ابريل 2015 - سبتمبر 2022</h6>
            <ul>
            <li>مساعدة الزبائن على ايجاد مقاعدهم</li>
            <li>تاكد انا الزبائن يستمتعون بوقنهم في السينما</li>
            <li>التعامل مع الزبائن المزعجين</li>
            </ul>`,
            "computerWorld.jpg", "Computer World Logo"),
        new Section("Other Experiences",
            `<strong>Aali Charity Center</strong>
            <ul>
            <li>help coordinate events by creating online forms using google forms to collect data for the events</li>
            </ul>`,
            "الخبرات الاخرى",
            `<strong>جمعية عالي الخيرية</strong>
        <ul>
        <li>ساعدت في تنظيم الفعاليات عن طريق استخدام google forms لتجميع معلومات المشاركين</li>
        </ul>`,
            "AaliCharity.png", "logo of a'ali charity"),
    ];

    var index = 0;
    sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        var contentSection = `<div class="p-3">
            <div class="mb-3">
                <div class="card-body">
                    <h5 class="card-title">`+ section.titleEng + `</h5>
                    <p class="card-text">`+ section.contentEng + `</p>
                </div>
            </div>
            <div class="mb-3 text-end" style="direction: rtl;">
                <div class="card-body">
                    <h5 class="card-title">`+ section.titleArb + `</h5>
                    <p class="card-text">`+ section.contentArb + `</p>
                </div>
            </div>
        </div>`;
        var order = (index % 2 == 0) ? 'order-first' : '';
        var imageSection = `<img class="` + order + `" src="` + section.imgLink + `" alt="` + section.imgAlt + `">`;
        // if (index % 2 == 0) {
        sectionDiv.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 g-2 p-5">
                `+ contentSection + `
                `+ imageSection + `
            </div>`;
        // } else {
        //     sectionDiv.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 g-2 p-5">
        //         `+ imageSection + `
        //         `+ contentSection + `
        //     </div>`;
        // }
        targetDiv.appendChild(sectionDiv);
        index++;
    });

} else { // if not CV then Portfolio page
    var targetDiv = document.getElementById("Portfolio");
}