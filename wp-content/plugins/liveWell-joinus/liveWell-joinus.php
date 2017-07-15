<?php
/*
Plugin Name: LiveWell joinus
Description: LiveWell joinus Plugin
*/
/* Start Adding Functions Below this Line */

// Register and load the widget
function liveWell_joinus_widget() {
	register_widget( 'liveWell_joinus' );
}
add_action( 'widgets_init', 'liveWell_joinus_widget' );

// Creating the widget
class liveWell_joinus extends WP_Widget {

function __construct() {
parent::__construct(

// Base ID of your widget
'liveWell_joinus',

// Widget name will appear in UI
__('LiveWell joinus', 'liveWell_joinus_domain'),

// Widget description
array( 'description' => __( 'Widget FOR PIHC joinus ', 'liveWell_joinus_domain' ), )
);
}

// Creating widget front-end

public function widget( $args, $instance ) {
echo '<div id="join-us">
	<div class="container">
				<div class="col-md-7">
			<section id="text-3" class="widget widget_text">			<div class="textwidget"><a href="https://www.edgeofamazing.org" target="_blank"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2017/05/SaveTheDate_650x250.jpg" alt="Edge of Amazing" class="img-responsive"></a></div>
		</section>		</div>
						<div class="col-md-5">
			<section id="text-2" class="widget widget-align widget_text">			<div class="textwidget"><h2>Join Us</h2>
<h3>Become an Institute Insider!</h3>
<p>Sign up on our Community Partner Portal to receive exclusive access to special reports, events, newsletters and more.</p>
<p><a href="http://www.pihccommunity.org/" target="_blank" class="btn btn-blue">SUBSCRIBE</a></p></div>
		</section>		</div>
			</div>
</div>';
}

// Widget Backend
public function form( $instance ) {
if ( isset( $instance[ 'FooterText' ] ) ) {
$FooterText = $instance[ 'FooterText' ];
}
else {
$FooterText = __( 'New FooterText', 'liveWell_joinus_domain' );
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
} // Class liveWell_joinus ends here

/* Stop Adding Functions Below this Line */
?>
