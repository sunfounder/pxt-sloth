# Sloth:bit
This library provides a driver for sloth:bit from sunfounder, see  https://www.sunfounder.com/humanoid-robot-bbc-micro-bit.html  


## Basic usage

```blocks  

// Set the calibration value to servos of sloth:bit  
// the arguments are (Right Leg, Left Leg, Right Foot, Left Foot)  
sloth.set_offset(0, 0, 0, 0)

// Sloth:bit stand still  
sloth.stand_still()  

// Sloth:bit do an action step times in speed  
// action is a member of sloth.action_name  
sloth.do_action(sloth.actions(sloth.action_name.walk), 1, 50);
```

Use ``||sloth.do_action||`` to do an action.  
Use ``||sloth.actions||`` to get actions build-in.  
Use ``||sloth.stand_still||`` to stand still.  
Use ``||sloth.set_offset||`` to set offset for stand still.  
Use ``||sloth.cali_by_button||`` on start to calibrate the servos, and get value for offset on LED screen.  

### Sensors  

Use ``||sloth.volume_of_heard||`` to return volume of sound sensor get.  
Use ``||sloth.obstacle_detected||``, if IR sensor get signal, return ture.   
Use ``||sloth.onHeard||``, event sloth:bit heard the sound whitch volume over threshold.    

## Examples:
### Sloth:bit do actions

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

### Calibrate sloth:bit

If stand still position not correct, just call ``sloth.cali_by_button()`` on start.

```blocks
sloth.cali_by_button()
```


### sloth:bit walk with obstacle avoided

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

### sloth:bit walk when sound heard

When heard sound over 550, sloth:bit walk.

```blocks
sloth.onHeard(550, () => {
    basic.showIcon(IconNames.Surprised)
    sloth.do_action(sloth.actions(sloth.action_name.swing), 1, 50)
    sloth.stand_still()
})
basic.forever(() => {
    basic.showIcon(IconNames.Asleep)
})

```

## Supported targets

* for PXT/microbit


## License

MIT


