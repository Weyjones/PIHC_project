<?php
/*
Plugin Name: PIHC footer
Description: pihc footer Plugin
*/
/* Start Adding Functions Below this Line */

// Register and load the widget
function pihc_footer_widget() {
	register_widget( 'pihc_footer' );
}
add_action( 'widgets_init', 'pihc_footer_widget' );

// Creating the widget
class pihc_footer extends WP_Widget {

function __construct() {
parent::__construct(

// Base ID of your widget
'pihc_footer',

// Widget name will appear in UI
__('PIHC footer', 'pihc_footer_domain'),

// Widget description
array( 'description' => __( 'Widget FOR PIHC footer ', 'pihc_footer_domain' ), )
);
}

// Creating widget front-end

public function widget( $args, $instance ) {
echo '<footer id="footer">
	<div class="container">
		<p>© 2016 Providence Institute for a Healthier Community. All rights reserved.</p>
	</div>
</footer>';
}

// Widget Backend
public function form( $instance ) {
if ( isset( $instance[ 'FooterText' ] ) ) {
$FooterText = $instance[ 'FooterText' ];
}
else {
$FooterText = __( 'New FooterText', 'pihc_footer_domain' );
}
// Widget admin form
?>
<p>
<label for="<?php echo $this->get_field_id( 'FooterText' ); ?>"><?php _e( 'FooterText:' ); ?></label>
<input class="widefat" id="<?php echo $this->get_field_id( 'FooterText' ); ?>" name="<?php echo $this->get_field_name( 'FooterText' ); ?>" type="text" value="<?php echo esc_attr( $FooterText ); ?>" />
</p>
<?php
}

// Updating widget replacing old instances with new
public function update( $new_instance, $old_instance ) {
$instance = array();
$instance['FooterText'] = ( ! empty( $new_instance['FooterText'] ) ) ? strip_tags( $new_instance['FooterText'] ) : '';
return $instance;
}
} // Class pihc_footer ends here

/* Stop Adding Functions Below this Line */
?>
