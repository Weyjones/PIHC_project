<?php
/*
Plugin Name: LiveHealthy Topics
Description: LiveHealthy Topics Plugin
*/
/* Start Adding Functions Below this Line */

// Register and load the widget
function liveHealthy_topics_widget() {
	register_widget( 'liveHealthy_topics' );
}

add_action( 'widgets_init', 'liveHealthy_topics_widget' );
wp_enqueue_style( 'liveHealthy-topics.css', plugins_url( 'style.css', __FILE__ ) );

// Creating the widget
class liveHealthy_topics extends WP_Widget {

function __construct() {
parent::__construct(

// Base ID of your widget
'liveHealthy_topics',

// Widget name will appear in UI
__('LiveHealthy topics', 'liveHealthy_topics_domain'),

// Widget description
array( 'description' => __( 'Widget FOR LiveHealthy Topics ', 'liveHealthy_topics_domain' ), )
);
}

// Creating widget front-end
public function widget( $args, $instance ) {
echo '<div id="livehealthy-topics" class="container">
        <div class="row">
            <div class="col-sm-6">';

echo bellows( 'main' , array( 'menu' => 10 ) );
echo '      </div>
            <div class="col-sm-6">';
echo bellows( 'main' , array( 'menu' => 11 ) );
echo '
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
$FooterText = __( 'New FooterText', 'liveHealthy_topics_domain' );
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
} // Class liveHealthy_topics ends here

/* Stop Adding Functions Below this Line */
?>
