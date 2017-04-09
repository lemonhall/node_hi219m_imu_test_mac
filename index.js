var SerialPort = require('serialport');  //引入模块

var portName = '/dev/tty.SLAB_USBtoUART'; //定义串口名
var serialPort = new SerialPort("/dev/tty.SLAB_USBtoUART", {
                             autoOpen: false,
                             baudRate: 115200,  //波特率
                             dataBits: 8,    //数据位
                             parity: 'none',   //奇偶校验
                             stopBits: 1
                          }, function(error){
                            console.log(error);
                          }); 
var Struct = require('struct');

var msg     = Struct()
             .chars('frameStart',2)
             .word16Sle('len')
             .word16Sle('crc')
             .word16Sle('id')
             .chars('acc',1)
             .word16Sle('ax')
             .word16Sle('ay')
             .word16Sle('az')
             .chars('b0',1)
             .word16Sle('bx')
             .word16Sle('by')
             .word16Sle('bz')
             .chars('c0',1)
             .word16Sle('cx')
             .word16Sle('cy')
             .word16Sle('cz')
             .chars('d0',1)
             .word16Sle('Roll')
             .word16Sle('Pitch')
             .word16Sle('Yaw');

function onData(data){
  if(data.length == 36){ 
      msg._setBuff(data);
      var proxy = msg.fields;
      console.log("俯仰角:",proxy.Roll,"横滚角:",proxy.Pitch,"航向角:",proxy.Yaw);
  }
}

serialPort.open(function(error){ 
   if(error){ 
     console.log("打开端口"+portName+"错误："+error);
   }else{  
    console.log("打开端口成功，正在监听数据中");
     serialPort.on('data',onData);
   }
});