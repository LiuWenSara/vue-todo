// 本地储存LocalStorage
var KEY = 'vue-todolist';
var storage = window.localStorage;
var todoStorage = {
    fetch: function () {
        var todos = JSON.parse(storage.getItem(KEY) || '[]');
        todos.forEach(function (todo, index) {
            todo.id = index
        });
        todoStorage.len = todos.length;
        return todos;
    },
    save: function (todos) {
        storage.setItem(KEY, JSON.stringify(todos));
    }
};

var vm = new Vue({
    el:"#todo-app",
    data:{
        todos:todoStorage.fetch(),
        newTodo:""
    },
    watch:{
        todos:{
            //遇到问题，初期以为handler只是一个自定义的函数名，自己编写的时候写了其他的名字，导致watch不能正常检测todos的变化，此处只能为handler；
            handler:function(todos){
              todoStorage.save(todos);
          },
          deep:true
        }
    },
    methods:{
        addTodo:function () {
          var newTodo = this.newTodo && this.newTodo.trim();
            if(newTodo == ""){
                alert("输入不能为空！");
            }else if(newTodo.length >= 20){
                alert("输入字数不能超过20");
            }else {
                this.todos.push({
                    id:todoStorage.len++,
                    content:newTodo,
                    done:false
                });
            }
            this.newTodo = "";
        },
        delTodo:function(todo) {
            this.todos.splice(this.todos.indexOf(todo),1);
        },
        delAll:function () {
            this.todos.splice(0,this.todos.length);
        },
        toggleDel:function (todo) {
            var index = this.todos.indexOf(todo);
            var buttons = document.querySelectorAll(".onlydel");
            if (buttons[index].style.display === "none") {
                buttons[index].style.display = "block";
            } else {
                buttons[index].style.display = "none";
            }
        }
    }
});
(function changeStatus() {
    var ul = document.getElementsByTagName("ul")[0];
    ul.addEventListener("click", function (event) {
        var checkbox = event.target;
        changeStyle(checkbox);

    });
    var statusInps = document.querySelectorAll(".checkbox");
    statusInps.forEach(function (e) {
        changeStyle(e);
    });
    function changeStyle(checkbox) {
        var checkedVal = checkbox.checked;
        var p = checkbox.parentElement;
        var s = p.nextElementSibling;
        var label = s.firstChild;
        if (checkedVal) {
            label.classList.add("done");
        } else {
            label.classList.remove("done");
        }

    }

})();

