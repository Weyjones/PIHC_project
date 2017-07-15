<?php
/*
Plugin Name: LiveWell background
Description: LiveWell background Plugin
*/
/* Start Adding Functions Below this Line */

// Register and load the widget
function liveWell_background_widget() {
	register_widget( 'liveWell_background' );
}
add_action( 'widgets_init', 'liveWell_background_widget' );

// Creating the widget
class liveWell_background extends WP_Widget {

function __construct() {
parent::__construct(

// Base ID of your widget
'liveWell_background',

// Widget name will appear in UI
__('LiveWell background', 'liveWell_background_domain'),

// Widget description
array( 'description' => __( 'Widget FOR PIHC footer ', 'liveWell_background_domain' ), )
);
}

// Creating widget front-end

public function widget( $args, $instance ) {
echo '<div class="livewell banner" style="background: url(\'http://www.pihcsnohomish.org/wp-content/uploads/2016/04/LiveWellHomePage.jpg\') no-repeat top center; background-size:cover">
	<div class="container">
							</div>
</div>';
}

// Widget Backend
public function form( $instance ) {
if ( isset( $instance[ 'FooterText' ] ) ) {
$FooterText = $instance[ 'FooterText' ];
}
else {
$FooterText = __( 'New FooterText', 'liveWell_background_domain' );
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
} // Class liveWell_background ends here

/* Stop Adding Functions Below this Line */
?>
