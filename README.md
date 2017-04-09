1、Dependencies
npm install serialport --save
npm install struct --save


2、Install
git clone https://github.com/lemonhall/node_hi219m_imu_test_mac.git
cd node_hi219m_imu_test_mac
node index.js

3、Driver Install
Find Driver on https://www.douban.com/doulist/45927342/

http://cn.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers

It's for mac...

4、Find TTY
ls /dev/tty*

'/dev/tty.SLAB_USBtoUART'

5、coding....

6、Data define

      len  crc  90+id
5a a5 1e00 df8e 9000   
1  2  3\4  5\6  7\8

加速度     ax    ay      az
a0        f7ff  1900    ca03
9		  10/11 12/13	14/15

角速度     bx    by      bz      
b0        0000  0000    0000
16		  17/18 19/20	21/22 

地磁       mx    my      mz
c0        0a01  a100    36ff 
23		  24/25 26/27   28/29

姿态角     Roll  Pitch   Yaw
d0        cdff  68ff    0c07
31		  31/32 33/24   35/36

姿态角数据包，格式为 int16，共三个轴，每个轴占 2 个字节，低字节在前。Roll, Pitch 为实际值乘以 100 后得到的数值，Yaw 为乘以 10 得到的数值。D0 为数据包标识.(关于 Roll, Pitch Yaw 的定义参见附录)

我得到了一个：Roll: -5583 Pitch: 1101 Yaw: 1782

Roll(俯仰角) [-90,90]  : -55.83 
Pitch(横滚角)[-180,180]: 11.01
Yaw(航向角)  [0,360]   : 178.2

也称 p/r/y 或欧拉角 
指俯仰角(Pitch)横滚角(Roll)和航向角(Yaw)， 他们通过 9 轴原始数据融合，解算得出，是描述物体空间旋转状态 的重要参数。由四元数转换而来。 本模块输出的欧拉角的定义为:
Pitch(θ,theta) : 绕Y轴运动，范围[-90,90]
Roll(φ, phi) :   
Yaw(ψ,psi) :
其中 XYZ 轴即为模块上丝印标注的 XYZ 轴