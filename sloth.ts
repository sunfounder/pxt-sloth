
//
//% weight=5 color=#1BAFEA icon="\uf1b0"
namespace custom {
    const PCA9685_ADDRESS = 0x40
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04
    const PRESCALE = 0xFE
    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09
    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    export enum Servos {
        S1 = 0x01,
        S2 = 0x02,
        S3 = 0x03,
        S4 = 0x04,
        S5 = 0x05,
        S6 = 0x06,
        S7 = 0x07,
        S8 = 0x08
    }

    let initialized = false
    let servos = [Servos.S1, Servos.S2, Servos.S3, Servos.S4];
    let origin_positions = [90, 90, 90, 90];
    let home_positions = [0, 0, 0, 0];
    let servo_positions = [0, 0, 0, 0];   // ralative position to home_position
    let offset = [0, 0, 0, 0];
    let actions:actions;

    function i2cwrite(reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf)
    }

    function i2cread(reg: number) {
        pins.i2cWriteNumber(PCA9685_ADDRESS, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(PCA9685_ADDRESS, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(MODE1, 0x00)
        setFreq(50);
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(MODE1, newmode); // go to sleep
        i2cwrite(PRESCALE, prescale); // set the prescaler
        i2cwrite(MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;

        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf);
    }

    //% blockId=sloth_servo_write block="Servo %index|degree %degree"
    //% weight=10
    //% blockGap=50
    //% degree.min=0 degree.max=180
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=4
    export function servo_write(index: Servos, degree: number): void {
        if (!initialized) {
            initPCA9685()
        }
        // 50hz: 20,000 us
        let v_us = (degree * 1800 / 180 + 600) // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000
        setPwm(index + 7, 0, value)
    }

    //% blockId=sloth_servo_write_all block="Servo all degree %angles"
    //% weight=10
    //% angles.min=0 angles.max=180
    export function servo_write_all(angles: number[]): void {
        for (let i = 0; i <= servos.length; i++) {
            servo_write(servos[i], origin_positions[i] + angles[i] + offset[i]); // ralative angle to home
        }
    }
    /**
     * servo move, input 4 elements array, to move all servo
     * @param speed ; eg: 50
    */
    //% blockId=sloth_servo_move block="Servo move to %target| %speed|dps"
    //% weight=10
    //% speed.min=1 speed.max=100
    export function servo_move(targets: number[], speed: number = 50): void {
        let flag = [0, 0, 0, 0]
        while (true) {
            for (let i = 0; i <= servos.length; i++) {
                if (servo_positions[i] != targets[i]) {
                    if (servo_positions[i] > targets[i])
                        servo_positions[i] -= 1;
                    else
                        servo_positions[i] += 1;
                }
                else
                    flag[i] = 1;
            }
            servo_write_all(servo_positions);
            basic.pause(100 / speed);
            let sum = 0
            for (let i of flag)
                sum += i;
            if (sum == flag.length)
                break;
        }
    }

    /**
     * home: 4 servos turn to 90 degree
     * @param: none
     */
    //% blockId=sloth_home block="home"
    //% weight=100
    export function home(): void {
        servo_positions = home_positions
        servo_write_all(servo_positions);
    }

    //% blockId=sloth_calibrate block="calibrate | Upper Left %o1| Bottom Left %o2| Upper Right %o3| Bottom Right %o4"
    //% weight=100
    //% o1.min=-30 o1.max=30
    //% o2.min=-30 o2.max=30
    //% o3.min=-30 o3.max=30
    //% o4.min=-30 o4.max=30
    export function calibrate(o1: number, o2: number, o3: number, o4: number): void {
        offset = [-o1, -o2, -o3, -o4]
        home();
    }

    /**
     * Do an action step times in speed.
     * @param step ; eg: 1
     * @param speed ; eg: 50
     */
    //% blockId=sloth_do_action block="%action|%step|step in %speed|speed"
    //% weight=100
    //% speed.min=1 speed.max=100
    //% action.fieldEditor="gridpicker" action.fieldOptions.columns=2
    export function do_action(action: actions.action_name, step: number = 1, speed: number = 50) : void {
        for (let i = 0; i < step; i++) {
            for (let data of actions.action_data[action]) {
                servo_move(data, speed);
            }
        }
        home()
    }

    //% blockId=sloth_ultrasonic block="Ultrasonic|pin %pin"
    //% weight=20
    export function Ultrasonic(pin: DigitalPin): number {

        // send pulse
        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(pin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(pin, 0);

        // read pulse
        let d = pins.pulseIn(pin, PulseValue.High, 11600);
        return d / 58;
    }
}