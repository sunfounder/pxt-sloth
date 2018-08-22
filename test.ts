sloth.set_offset(
-3,
10,
5,
7
)
basic.forever(() => {
    sloth.do_action(sloth.action_name.walk, 1, 50)
    sloth.do_action(sloth.action_name.walk_backward, 1, 50)
    sloth.do_action(sloth.action_name.turn_left, 1, 50)
    sloth.do_action(sloth.action_name.turn_right, 1, 50)
    sloth.do_action(sloth.action_name.moonwalk_left, 1, 50)
    sloth.do_action(sloth.action_name.moonwalk_right, 1, 50)
    sloth.do_action(sloth.action_name.shake_left, 1, 50)
    sloth.do_action(sloth.action_name.shake_right, 1, 50)
    sloth.do_action(sloth.action_name.go_up_and_down, 1, 50)
    sloth.do_action(sloth.action_name.swing, 1, 50)
    sloth.do_action(sloth.action_name.walk_boldly, 1, 50)
    sloth.do_action(sloth.action_name.walk_backward_boldly, 1, 50)
    sloth.do_action(sloth.action_name.walk_shyly, 1, 50)
    sloth.do_action(sloth.action_name.walk_backward_shyly, 1, 50)
    sloth.do_action(sloth.action_name.big_swing, 1, 50)
})
