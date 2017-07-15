<?php
/*
Plugin Name: PIHC header
Description: pihc header Plugin
*/
/* Start Adding Functions Below this Line */

// Register and load the widget
function wpb_load_widget() {
	register_widget( 'pihc_header' );
}
add_action( 'widgets_init', 'wpb_load_widget' );

// Creating the widget
class pihc_header extends WP_Widget {

function __construct() {
parent::__construct(

// Base ID of your widget
'pihc_header',

// Widget name will appear in UI
__('PIHC header', 'pihc_header_domain'),

// Widget description
array( 'description' => __( 'Widget FOR PIHC header ', 'pihc_header_domain' ), )
);
}

// Creating widget front-end

public function widget( $args, $instance ) {
echo '<header id="header">
	<div class="container-fluid">

		<div class="col-sm-12 col-md-8 site-branding">
			<a href="http://www.pihcsnohomish.org/"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/logo.png" alt="" class="logo"></a>
		</div>
	</div>
</header>';
}

// Widget Backend
public function form( $instance ) {
if ( isset( $instance[ 'title' ] ) ) {
$title = $instance[ 'title' ];
}
else {
$title = __( 'New title', 'pihc_header_domain' );
}
// Widget admin form
?>
<p>
<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
</p>
<?php
}

// Updating widget replacing old instances with new
public function update( $new_instance, $old_instance ) {
$instance = array();
$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
return $instance;
}
} // Class pihc_header ends here

/* Stop Adding Functions Below this Line */
?>
