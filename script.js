var todolist = [
    {
        id: 1,
        name: "Football",
        address: "school",
        date: "2020-01-12",
        time: "21:00"
    },
    {
        id: 2,
        name: "Homework"
    }
];

$.each(todolist, function (i, user) {
    appendToUsrTable(user);
});

$("form").submit(function (e) {
    e.preventDefault();
});

$("form#addUser").submit(function () {
    var user = {};
    var nameInput = $('input[name="name"]').val().trim();
    //var addressInput = $('input[name="address"]').val().trim();
    //var dateInput = $('input[name="date"]').val().trim();
    //var timeInput = $('input[name="time"]').val().trim();
    if (nameInput) {
        $(this).serializeArray().map(function (data) {
            user[data.name] = data.value;
        });
        var lastUser = todolist[Object.keys(todolist).sort().pop()];
        user.id = lastUser.id + 1;

        addUser(user);
        
    } else {
        alert("All fields must have a valid value.");
    }
});

function addUser(user) {
    todolist.push(user);
    appendToUsrTable(user);
}

function editUser(id) {
    todolist.forEach(function (user, i) {
        if (user.id == id) {
            $(".modal-body").empty().append(`
                <form id="updateUser" action="">
                    <label for="name">What To Do</label>
                    <input class="form-control" type="text" name="name" value="${user.name}"/>
                    <label for="address">Where</label>
                    <input class="form-control" type="text" name="address" value="${user.address}"/>
                    <label for="age">Date</label>
                    <input class="form-control" type="date" name="date" value="${user.date}"/>
                    <label for="age">When</label>
                    <input class="form-control" type="time" name="time" value="${user.time}"/>
            `);
            $(".modal-footer").empty().append(`
                    <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${id})">Save changes</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </form>
            `);
        }
    });
}

function deleteUser(id) {
    var action = confirm("Are you sure you want to delete this event?");
    //var msg = "Event was deleted successfully!";
    todolist.forEach(function (user, i) {
        if (user.id == id && action != false) {
            todolist.splice(i, 1);
            $("#userTable #user-" + user.id).remove();
            //flashMessage(msg);
        }
    });
}

function updateUser(id) {
    //var msg = "Event updated successfully!";
    var user = {};
    user.id = id;
    todolist.forEach(function (user, i) {
        if (user.id == id) {
            $("#updateUser").children("input").each(function () {
                var value = $(this).val();
                var attr = $(this).attr("name");
                if (attr == "name") {
                    user.name = value;
                } else if (attr == "address") {
                    user.address = value;
                } else if (attr == "date") {
                    user.date = value;
                } else if (attr == "time") {
                    user.time = value;
                }
            });
            todolist.splice(i, 1);
            todolist.splice(user.id - 1, 0, user);
            $("#userTable #user-" + user.id).children(".userData").each(function () {
                var attr = $(this).attr("name");
                if (attr == "name") {
                    $(this).text(user.name);
                } else if (attr == "address") {
                    $(this).text(user.address);
                } else if (attr=="date"){
                    $(this).text(user.date);
                } else {
                    $(this).text(user.time);
                }
            });
            $(".modal").modal("toggle");
            //flashMessage(msg);
        }
    });
}

//function flashMessage(msg) {
//    $(".flashMsg").remove();
//    $(".row").prepend(`
//        <div class="col-sm-12"><div class="flashMsg alert alert-success alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>${msg}</strong></div></div>
//    `);
//}

function appendToUsrTable(user) {
    $("#userTable > tbody:last-child").append(`
        <tr class="animate__animated animate__fadeInLeft" id="user-${user.id}">
            <td class="userData" name="name">${user.name}</td>
            '<td class="userData" name="address">${user.address}</td>
            '<td class="userData" name="date">${user.date}</td>
            '<td class="userData" name="time">${user.time}</td>
            '<td align="center">
                <button class="btn btn-primary form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
            </td>
            <td align="center">
                <button class="btn btn-primary form-control" onClick="deleteUser(${user.id})">DELETE</button>
            </td>
        </tr>
    `);
}
