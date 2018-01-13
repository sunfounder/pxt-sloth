# Sloth:bit
This library provides a driver for sloth:bit from sunfounder, see https://www.sunfounder.com/


## Basic usage

```blocks
// Sloth:bit do an action step times in speed  
// action is a member of sloth.action_name
sloth.do_action(sloth.action_name.walk, 1, 50);  

// Set the calibration value to servos of sloth:bit  
// the arguments are (Left Leg, Left Foot, Right Leg, Right Foot)  
sloth.calibrate(0, 0, 0, 0)

// Calibrate the sloth:bit by buttons on microbit  
sloth.cali_by_button()  

// Set the sloth:bit to home position  
sloth.home()  

```

## Example: Sloth:bit walk

This little program will let the sloth:bit walk forward.
The sloth:bit walk in speed 50, and it will not stop until you power off.

```blocks
basic.forever(() => {
    sloth.do_action(sloth.action_name.walk, 1, 50)
})
```

## Calibrate sloth:bit

If home position not correct, just call ``sloth.cali_by_button()`` on start.

```blocks
sloth.cali_by_button()
```


## Supported targets

* for PXT/sunfounder
* for PXT/sloth


## License

MIT


