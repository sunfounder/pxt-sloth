# Sloth:bit
This library provides a driver for sloth:bit from sunfounder, see https://www.sunfounder.com/


## Basic usage

```blocks
// Sloth:bit do an action step times in speed  
// action is a member of sloth.action_name  
sloth.do_action(sloth.actions(sloth.action_name.walk), 1, 50);  

// Set the calibration value to servos of sloth:bit  
// the arguments are (Right Leg, Left Leg, Right Foot, Left Foot)  
sloth.set_offset(0, 0, 0, 0)

// Calibrate the sloth:bit by buttons on microbit  
sloth.cali_by_button()  

// Sloth:bit stand still  
sloth.stand_still()  

// Event sloth:bit heard the sound whitch volume over threshold  
sloth.onHeard(550, () => {
    sloth.do_action(sloth.actions(sloth.action_name.walk), 1, 50)
})  

// If IR sensor get signal, return ture  
sloth.obstacle_detected()  
  
// Return the value of sound sensor get  
sloth.volume_of_heard()  

// Servo move, input 4 elements array, to move all servo to their angle. 
// Argument: [left_leg, left_foot, right_leg, right_foot], dps for degree per second  
sloth.servo_move([0, 0, 0, 0], 50)  
```

Use ``||set_offset||`` to set offset for stand still
Use ``||set_gesture||`` to set gesture for sloth bit
use ``||actions||`` to get actions build-in
Use ``||cali_by_button||`` on start to calibrate the servos, and get value for offset on LED screen.
Use ``||do_action||`` to do an action
Use ``||volume_of_heard||`` to return value of sound sensor get
Use ``||servo_move||`` to move all servo to their angle

## Example: Sloth:bit do actions

This little program will let the sloth:bit do actions.
The sloth:bit show a number and then do action, it will do all actions build-in, each action for twice.

```blocks
basic.forever(() => {
    for (let index = 0; index <= sloth.actions(sloth.action_name.walk_backward_shily); index++) {
        basic.showNumber(index)
        sloth.do_action(index, 2, 50)
    }
})
})
```

## Calibrate sloth:bit

If stand still position not correct, just call ``sloth.cali_by_button()`` on start.

```blocks
sloth.cali_by_button()
```


## sloth:bit walk with obstacle avoided

Walk forward, obstacle detected, turn left.

```blocks
basic.forever(() => {
    if (sloth.obstacle_detected()) {
        sloth.do_action(sloth.actions(sloth.action_name.turn_left), 2, 50)
    } else {
        sloth.do_action(sloth.actions(sloth.action_name.walk), 1, 50)
    }
})
```  

## sloth:bit walk when sound heard

When heard sound over 550, sloth:bit walk.

```blocks
sloth.onHeard(550, () => {
    basic.showIcon(IconNames.Surprised)
    sloth.do_action(sloth.actions(sloth.action_name.walk), 1, 50)
})
basic.forever(() => {
    basic.showIcon(IconNames.Asleep)
})

```

## Supported targets

* for PXT/microbit


## License

MIT


