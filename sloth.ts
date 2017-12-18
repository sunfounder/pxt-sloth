
//
//% weight=5 color=#1BAFEA icon="\uf1b0"
namespace sloth {
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

    export enum PWMChn {
        CH0 = 0,
        CH1 = 1,
        CH2 = 2,
        CH3 = 3,
        CH4 = 4,
        CH5 = 5,
        CH6 = 6,
        CH7 = 7,
        CH8 = 8,
        CH9 = 9,
        CH10 = 10,
        CH11 = 11,
        CH12 = 12,
        CH13 = 13,
        CH14 = 14,
        CH15 = 15
    }

    let action_data = [
        [    // walk
            [0, 0, 0, -40],
            [0, -30, 0, -40],
            [30, -30, 30, -40],
            [30, 0, 30, 0],
            [30, 40, 30, 0],
            [30, 40, 30, 30],
            [-30, 40, -30, 30],
            [-30, 0, -30, 0],
        ],
        [    // walk backward
            [0, 0, 0, -40],
            [0, -30, 0, -40],
            [-30, -30, -30, -40],
            [-30, 0, -30, 0],
            [-30, 40, -30, 0],
            [-30, 40, -30, 30],
            [30, 40, 30, 30],
            [30, 0, 30, 0],
        ],
        [   // turn left
            [-30, 0, 0, -40],
            [-30, -30, 0, -40],
            [0, -30, 0, -40],
            [0, 0, 0, 0],
            [0, 40, -30, 0],
            [0, 40, -30, 30],
            [0, 40, 0, 30],
            [0, 0, 0, 0],
        ],
        [   // turn right
            [0, 40, 30, 0],
            [0, 40, 30, 30],
            [0, 40, 0, 30],
            [0, 0, 0, 0],
            [30, 0, 0, -40],
            [30, -30, 0, -40],
            [0, -30, 0, -40],
            [0, 0, 0, 0],
        ],
        [   // moon walk left
            [0, 0, 0, -20],
            [0, 20, 0, -40],
            [0, 40, 0, -20],
            [0, 20, 0, 0],
            [0, 0, 0, 0]
        ],
        [   // moon walk right
            [0, 20, 0, 0],
            [0, 40, 0, -20],
            [0, 20, 0, -40],
            [0, 0, 0, -20],
            [0, 0, 0, 0]
        ],
        [   // shake left
            [-40, 0, -20, 0],
            [-40, 40, -20, 30],
            [-20, 40, -20, 30],
            [-40, 40, -20, 30],
            [-20, 40, -20, 30],
        ],
        [   // shake right
            [20, 0, 40, 0],
            [20, -30, 40, -30],
            [20, -30, 10, -30],
            [20, -30, 40, -30],
            [20, -30, 10, -30],
        ],
        [   // go up and down
            [0, 50, 0, -50],
        ],
        [   // swing
            [0, -40, 0, 40],
        ],
        [    // walk manly
            [-20, 0, 20, -40],
            [-20, -30, 20, -40],
            [10, -30, 50, -40],
            [10, 0, 50, 0],
            [10, 40, 50, 0],
            [10, 40, 50, 30],
            [-50, 40, -10, 30],
            [-50, 0, -10, 0],
        ],
        [    // walk backward manly
            [-20, 0, 20, -40],
            [-20, -30, 20, -40],
            [-50, -30, -10, -40],
            [-50, 0, -10, 0],
            [-50, 40, -10, 0],
            [-50, 40, -10, 30],
            [10, 40, 50, 30],
            [10, 0, 50, 0],
        ],
        [    // walk shily
            [15, 0, -15, -40],
            [15, -30, -15, -40],
            [25, -30, -5, -40],
            [25, 0, -5, 0],
            [25, 40, -5, 0],
            [25, 40, -5, 30],
            [5, 40, -25, 30],
            [5, 0, -25, 0],
        ],
        [    // walk backward shily
            [15, 0, -15, -40],
            [15, -30, -15, -40],
            [-5, -30, -25, -40],
            [-5, 0, -25, 0],
            [-5, 40, -25, 0],
            [-5, 40, -25, 30],
            [25, 40, 5, 30],
            [25, 0, 5, 0],
        ],

        [   // big swing
            [0, -90, 0, 90],
        ],
    ]
    export enum action_name {
        walk = 0,
        walk_backward = 1,
        turn_left = 2,
        turn_right = 3,
        moonwalk_left = 4,
        moonwalk_right = 5,
        shake_left = 6,
        shake_right = 7,
        go_up_and_down = 8,
        swing = 9,
        walk_manly = 10,
        walk_backward_manly = 11,
        walk_shily = 12,
        walk_backward_shily = 13,
        big_swing = 14
    }

    let initialized = false
    let servos = [PWMChn.CH0, PWMChn.CH1, PWMChn.CH2, PWMChn.CH3];
    let origin_positions = [90, 90, 90, 90];
    let home_positions = [0, 0, 0, 0];
    let servo_positions = [0, 0, 0, 0];   // ralative position to home_position
    let offset = [0, 0, 0, 0];

    let img_none: Image = null
    let img_upper_left: Image = null
    let img_bottom_left: Image = null
    let img_upper_right: Image = null
    let img_bottom_right: Image = null
    let img_spanner: Image = null

    let left_leg_value = 0
    let left_foot_value = 0
    let right_leg_value = 0
    let right_foot_value = 0

    let servo_number = 1
    let temp_cali_value = 0
    let select_mode_flag = 0

    img_none = images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    img_upper_left = images.createImage(`
        # # . . .
        # # . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    img_bottom_left = images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        # # . . .
        # # . . .
        `)
    img_upper_right = images.createImage(`
        . . . # #
        . . . # #
        . . . . .
        . . . . .
        . . . . .
        `)
    img_bottom_right = images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . # #
        . . . # #
        `)
    img_spanner = images.createImage(`
        . # . # .
        . # # # .
        . . # . .
        . # # # .
        . # . # .
        `)

    select_mode_flag = 1

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

    //% blockId=sloth_set_pwm block="pwm set channel %channel|on: %on|off: %off"
    //% advanced=true
    //% on.min=0 on.max=4095
    //% off.min=0 off.max=4095
    //% channel.fieldEditor="gridpicker" channel.fieldOptions.columns=4
    export function setPwm(channel: PWMChn, on: number, off: number): void {
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

    //% blockId=sloth_servo_write block="Servo %channel|degree %degree"
    //% advanced=true
    //% degree.min=0 degree.max=180
    //% channel.fieldEditor="gridpicker" channel.fieldOptions.columns=4
    export function servo_write(channel: PWMChn, degree: number): void {
        if (!initialized) {
            initPCA9685()
        }
        // 50hz: 20,000 us
        let v_us = (degree * 1800 / 180 + 600) // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000
        setPwm(channel - 1, 0, value)
    }

    // blockId=sloth_servo_write_all block="Servo all degree %angles"
    // weight=10
    // angles.min=0 angles.max=180
    export function servo_write_all(angles: number[]): void {
        for (let i = 0; i <= servos.length; i++) {
            servo_write(servos[i], origin_positions[i] + angles[i] + offset[i]); // ralative angle to home
        }
    }
    /**
     * servo move, input 4 elements array, to move all servo
     * @param speed ; eg: 50
    */
    // blockId=sloth_servo_move block="Servo move to %target| %speed|dps"
    // weight=10
    // speed.min=1 speed.max=100
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
        offset = [o1, o2, o3, o4]
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
    export function do_action(action: action_name, step: number = 1, speed: number = 50): void {
        for (let i = 0; i < step; i++) {
            for (let data of action_data[action]) {
                servo_move(data, speed);
            }
        }
        home()
    }

    function select_servo() {   // select_mode_flag == 1
        if (servo_number == 1) {
            img_upper_left.showImage(0)
            basic.pause(100)
            img_none.showImage(0)
            basic.pause(100)
            temp_cali_value = right_leg_value
        } else if (servo_number == 2) {
            img_upper_right.showImage(0)
            basic.pause(100)
            img_none.showImage(0)
            basic.pause(100)
            temp_cali_value = left_leg_value
        } else if (servo_number == 3) {
            img_bottom_left.showImage(0)
            basic.pause(100)
            img_none.showImage(0)
            basic.pause(100)
            temp_cali_value = right_foot_value
        } else if (servo_number == 4) {
            img_bottom_right.showImage(0)
            basic.pause(100)
            img_none.showImage(0)
            basic.pause(100)
            temp_cali_value = left_foot_value
        }
    }

    function cali_value() {    //  select_mode_flag == 2
        if (servo_number == 1) {
            right_leg_value = temp_cali_value
            //sloth.servo_write(servos[2], 90 + right_leg_value)
        } else if (servo_number == 2) {
            left_leg_value = temp_cali_value
            //sloth.servo_write(servos[0], 90 + left_leg_value)
        } else if (servo_number == 3) {
            right_foot_value = temp_cali_value
            //sloth.servo_write(servos[3], 90 + right_foot_value)
        } else if (servo_number == 4) {
            left_foot_value = temp_cali_value
            //sloth.servo_write(servos[1], 90 + left_foot_value)
        }
        sloth.calibrate(
            left_leg_value,
            left_foot_value,
            right_leg_value,
            right_foot_value
        )
        basic.pause(10)
        //basic.showNumber(temp_cali_value)
    }

    function show_cali_value() {    //  select_mode_flag == 3
        if (servo_number == 1) {
            img_upper_left.showImage(0)
            basic.pause(100)
            img_none.showImage(0)
            basic.pause(100)
            basic.showNumber(right_leg_value)
            basic.pause(100)
        } else if (servo_number == 2) {
            img_upper_right.showImage(0)
            basic.pause(100)
            img_none.showImage(0)
            basic.pause(100)
            basic.showNumber(left_leg_value)
            basic.pause(100)
        } else if (servo_number == 3) {
            img_bottom_left.showImage(0)
            basic.pause(100)
            img_none.showImage(0)
            basic.pause(100)
            basic.showNumber(right_foot_value)
            basic.pause(100)
        } else if (servo_number == 4) {
            img_bottom_right.showImage(0)
            basic.pause(100)
            img_none.showImage(0)
            basic.pause(100)
            basic.showNumber(left_foot_value)
            basic.pause(100)
        }
    }


    /**
     * Calibrate 4 servos by buttonA, buttonB, and A+B.
     */
    //% blockId=sloth_cali_by_button block="calibrate by buttons"
    //% weight=100
    export function cali_by_button(): void {
        basic.showString("Cali")//brate 4 servos by button A, B & A+B")

        input.onButtonPressed(Button.A, () => {
            if (select_mode_flag == 1) {
                servo_number += -1
                if (servo_number < 1) {
                    servo_number = 4
                }
            }
            else if (select_mode_flag == 2) {
                temp_cali_value += -1
            }
            else if (select_mode_flag == 3) {
                select_mode_flag = 1
            }
        })

        input.onButtonPressed(Button.B, () => {
            if (select_mode_flag == 1) {
                servo_number += 1
                if (servo_number > 4) {
                    servo_number = 1
                }
            }
            else if (select_mode_flag == 2) {
                temp_cali_value += 1
            }
            else if (select_mode_flag == 3) {
                select_mode_flag = 1
            }
        })

        input.onButtonPressed(Button.AB, () => {
            if (select_mode_flag == 1) {  // confirm the current servo select
                select_mode_flag = 2
            }
            else if (select_mode_flag == 2) {  // confirm the current servo cali
                select_mode_flag = 3
            }
            else if (select_mode_flag == 3) {  // return to the servo select
                select_mode_flag = 1
                //servo_number += 1
                //if (servo_number > 4) {
                //    servo_number = 1
                //}
            }
        })

        basic.forever(() => {
            if (select_mode_flag == 1) {
                select_servo()
            }
            else if (select_mode_flag == 2) {
                img_spanner.showImage(0)
                cali_value()
            }
            else if (select_mode_flag == 3) {
                show_cali_value()
            }
        })

    }

}