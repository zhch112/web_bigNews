$(function() {
  //给登录注册的链接绑定点击事件
  $('#link_reg').on('click', function() {
    $('.login_box').hide();
    $('.reg_box').show();
  })
  $('#link_login').on('click', function() {
    $('.reg_box').hide();
    $('.login_box').show();
  })


    // 表单验证
    //从layui中获取form对象

    //只要导入layui的js文件，就会自动生成一个全局对象layui
    let form = layui.form;
    let layer = layui.layer;

    form.verify({
      // 自定义pwd规则
      pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
      repwd: function(value) {
        /* 通过形参拿到的是确认密码=框里面的内容 */
        let pwd = $('.reg_box [name="password"]').val();
        if(pwd !== value) return '两次密码不一致'
      }
    })

    /* 监听注册表单的提交事件 */
    $('#form_reg').on('submit', function(e) {
        // 阻止表单默认行为
        e.preventDefault();
        let uname = $('#form_reg [name="username"]').val();
        let upsw = $('#form_reg [name="password"]').val();
        // console.log(uname);
        // console.log(upsw);
        $.post("/api/reguser", {username:uname, password:upsw}, function (res) {
              if(res.status !== 0) 
                // return console.log(res.message);
                return layer.msg(res.message);

              // console.log("reg success");
              layer.msg("reg success");
              // 模拟人为点击行为
              $("#link_login").click();

          }
        );
    })


    /* 监听登录表单的提交事件 */
    $('#form_login').on('submit', function(e) {
      e.preventDefault();
      let uname = $('#form_login [name="username"]').val();
      let upsw = $('#form_login [name="password"]').val();
      console.log(uname);
      console.log(upsw);
      $.ajax({
        type: "post",
        url: "/api/login",
        // 快速获取表单的数据
        data: $(this).serialize(),
        success: function (res) {
            if(res.status !== 0)
              return layer.msg('login fail');

            layer.msg('login success');
            // 将登录成功得到的token值存储
            localStorage.setItem('token', res.token);
            console.log(localStorage.getItem('token'));
            // 跳转到后台主页
            // location.href = '/index.html';
        }
      });
    })


})