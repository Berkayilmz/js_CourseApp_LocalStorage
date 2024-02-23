//Course constructor
function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

//UI constructor
function UI() {

}

UI.prototype.addCourseToList = function (course) {
    const list = document.getElementById('course-list');

    var html =
    `
    <tr>
        <td><img src="img/${course.image}"></td>
        <td>${course.title}</td>
        <td>${course.instructor}</td>
        <td><a href="#" class="btn btn-danger btn-s btn_delete">Delete</a></td>
    </tr>
    `;

    list.innerHTML += html;
}

UI.prototype.clearControls = function () {
    title = document.getElementById('title').value="";
    instructor = document.getElementById('Instructor').value="";
    image = document.getElementById('image').value="";
}

UI.prototype.deleteCourse=function(course){
    if(course.classList.contains("btn_delete")){
        course.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert=function(message,className){
    var alert=`
    <div class="alert alert-${className}">
        ${message}
    </div>
    `;

    const row=document.querySelector('.row');
    //insertAdjacentHTML params: beforeBegin, afterBegin, beforeEnd, afterEnd.
    row.insertAdjacentHTML("afterBegin",alert);

    setTimeout(function(){
        var alertDiv=document.querySelector('.alert');
        if(alertDiv){
            alertDiv.remove();
        }
    },3000);
    
}


document.getElementById('new-course').addEventListener('submit', function (e) {

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('Instructor').value;
    const image = document.getElementById('image').value;

    //Create Course object
    const course = new Course(title, instructor, image);

    //Create UI
    const ui = new UI();

    if(title==='' || instructor==='' || image===''){
        ui.showAlert('Please complete the form!','warning');
    }else{
        //Add course to list
        ui.addCourseToList(course);

        //Clear controls
        ui.clearControls();

        ui.showAlert('The course has been added!','success');
    }

    
    e.preventDefault();
});

document.getElementById('course-list').addEventListener('click',function(e){
    const ui=new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('The course has been deleted!','danger');
});