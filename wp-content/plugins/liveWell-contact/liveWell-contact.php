<?php
/*
Plugin Name: LiveWell contact
Description: LiveWell contact Plugin
*/
/* Start Adding Functions Below this Line */

// Register and load the widget
function liveWell_contact_widget() {
	register_widget( 'liveWell_contact' );
}
add_action( 'widgets_init', 'liveWell_contact_widget' );

// Creating the widget
class liveWell_contact extends WP_Widget {

function __construct() {
parent::__construct(

// Base ID of your widget
'liveWell_contact',

// Widget name will appear in UI
__('LiveWell contact', 'liveWell_contact_domain'),

// Widget description
array( 'description' => __( 'Widget FOR PIHC footer ', 'liveWell_contact_domain' ), )
);
}

// Creating widget front-end

public function widget( $args, $instance ) {
echo '<div class="contact-details">
	<div class="container border-top ">
		<ul class="i-social">
			<li class="title">Follow Us:</li>
						<li><a href="https://www.facebook.com/PIHCSnohomish/" target="_blank" class="fb"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/i-fb.png" alt=""></a></li>
						<li><a href="https://twitter.com/pihcsnohomish" target="_blank" class="fb"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/i-twitter.png" alt=""></a></li>
						<li><a href="https://www.linkedin.com/company/providence-institute-for-a-healthier-community" target="_blank" class="fb"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/i-linkedin.png" alt=""></a></li>
						<li><a href="https://www.youtube.com/channel/UCRJTnV38hMzaBUvgnB7SlDw" target="_blank" class="fb"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/i-youtube.png" alt=""></a></li>
					</ul>
		<div class="contact-info">
			<ul>
				<li>1321 Colby Ave, C4 Room 014, Everett, WA 98201</li>
				<li><strong>Phone: </strong>425.261.3344</li>
				<li><strong>Email: </strong><a href="mailto:PIHC@Providence.org">PIHC@Providence.org</a></li>
			</ul>
		</div>
	</div>
</div>';
}

// Widget Backend
public function form( $instance ) {
if ( isset( $instance[ 'FooterText' ] ) ) {
$FooterText = $instance[ 'FooterText' ];
}
else {
$FooterText = __( 'New FooterText', 'liveWell_contact_domain' );
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
} // Class liveWell_contact ends here

/* Stop Adding Functions Below this Line */
?>
