$(document).ready(function () {
  clickTreeDirectory();
});

// 点击目录事件
function clickTreeDirectory() {
  // 判断有 active 的话，就递归循环把它的父目录打开
  var treeActive = $("#tree .active");
  if ( treeActive.length ) {
    showActiveTree(treeActive, true);
  }

  // 点击目录，就触发折叠动画效果
  $(document).on("click", "#tree a[class='directory']", function (e) {
    // 用来清空所有绑定的其他事件
    event.preventDefault();

    var icon = $(this).children(".fa");
    var iconIsOpen = icon.hasClass("fa-folder-open");
    var subTree = $(this).siblings("ul");

    icon.removeClass("fa-folder-open").removeClass("fa-folder");

    if (iconIsOpen) {
      if (typeof subTree != "undefined") {
        subTree.slideUp({ duration: 100 });
      }
      icon.addClass("fa-folder");
    } else {
      if (typeof subTree != "undefined") {
        subTree.slideDown({ duration: 100 });
      }
      icon.addClass("fa-folder-open");
    }
  });
}

// 循环递归展开父节点
function showActiveTree(jqNode, isSiblings) {
  if ( jqNode.attr("id") === "tree"  ) { return; }
  if ( jqNode.is("ul") ) {
    jqNode.css("display", "block");

    // 这个 isSiblings 是给搜索用的
    // true 就显示开同级兄弟节点
    // false 就是给搜索用的，值需要展示它自己就好了，不展示兄弟节点
    if ( isSiblings ) { 
      jqNode.siblings().css("display", "block");
      jqNode.siblings("a").css("display", "inline");
      jqNode.siblings("a").find(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
    }
  }
  jqNode.each(function(){ showActiveTree($(this).parent(), isSiblings); });
}