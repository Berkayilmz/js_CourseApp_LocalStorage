

class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random() * 1000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }

}

class UI {

    addCourseToList(course) {
        const list = document.getElementById('course-list');

        var html =
            `
    <tr>
        <td><img src="img/${course.image}"></td>
        <td>${course.title}</td>
        <td>${course.instructor}</td>
        <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-s btn_delete">Delete</a></td>
    </tr>
    `;

        list.innerHTML += html;
    }

    clearControls() {
        document.getElementById('title').value = "";
        document.getElementById('Instructor').value = "";
        document.getElementById('image').value = "";
    }

    deleteCourse(course) {

        if (course.classList.contains("btn_delete")) {
            course.parentElement.parentElement.remove();
            return true;
        }
    }

    showAlert(message, className) {
        var alert = `
    <div class="alert alert-${className}">
        ${message}
    </div>
    `;

        const row = document.querySelector('.row');
        //insertAdjacentHTML params: beforeBegin, afterBegin, beforeEnd, afterEnd.
        row.insertAdjacentHTML("afterBegin", alert);

        setTimeout(function () {
            var alertDiv = document.querySelector('.alert');
            if (alertDiv) {
                alertDiv.remove();
            }
        }, 3000);

    }
}

class LocalStorage {

    static getCourses() {
        let courses;
        if (localStorage.getItem('courses') === null) {
            courses = [];
        } else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }

    static displayCourses() {
        const courses = LocalStorage.getCourses();
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
    }

    static addCourse(course) {
        const courses = LocalStorage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    static deleteCourse(element) {
        if (element.classList.contains('btn_delete')) {
            const dataId = element.getAttribute('data-id'); // getAttribute() ile istediğimiz elementin istediğimiz attribute'una ulaşım sağlayabiliriz.
            const courses = LocalStorage.getCourses();
            courses.forEach((course, index) => {
                if (course.courseId == dataId) {
                    courses.splice(index, 1);
                }
            });
            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }

}

document.addEventListener('DOMContentLoaded', LocalStorage.displayCourses());


document.getElementById('new-course').addEventListener('submit', function (e) {

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('Instructor').value;
    const image = document.getElementById('image').value;

    //Create Course object
    const course = new Course(title, instructor, image);

    //Create UI
    const ui = new UI();

    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Please complete the form!', 'warning');
    } else {
        //Add course to list
        ui.addCourseToList(course);
        //Save to local storage
        LocalStorage.addCourse(course);

        //Clear controls
        ui.clearControls();

        ui.showAlert('The course has been added!', 'success');


    }


    e.preventDefault();
});

document.getElementById('course-list').addEventListener('click', function (e) {
    const ui = new UI();
    if (ui.deleteCourse(e.target) == true) {
        //Delete to local storage
        LocalStorage.deleteCourse(e.target);
        ui.showAlert('The course has been deleted!', 'danger');
    }

});





