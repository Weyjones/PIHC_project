<?php
/*
Plugin Name: LiveWell Local Search
Description: LiveWell Local search Plugin
*/
/* Start Adding Functions Below this Line */

// Register and load the widget
function livewell_search_widget() {
	register_widget( 'livewell_search' );
}

//wp_enqueue_script('googlemap', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDxcqlp2yAzg0UeyqkZHCLebZx8Qq96XYk', array(), true);

add_action( 'widgets_init', 'livewell_search_widget' );
//wp_enqueue_style( 'app.css', plugins_url( 'app.css', __FILE__ ) );
//wp_enqueue_script( 'angular', '' . 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js', array(), true );
//wp_enqueue_script( 'angular-route', '' . 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-route.min.js', array(), true );
wp_enqueue_script('angular', plugins_url( 'lib/angular.js', __FILE__ ), array(), true);
wp_enqueue_script('angular-resource', plugins_url( 'lib/angular-resource.min.js', __FILE__ ), array(), true);
wp_enqueue_script('angular-route', plugins_url( 'lib/angular-ui-router.js', __FILE__ ), array(), true);
//wp_enqueue_script('angular-route', plugins_url( 'lib/angular-route.min.js', __FILE__ ), array(), true);
//wp_enqueue_script('basetag', plugins_url( 'lib/setup.js', __FILE__ ), array(), true);
//wp_enqueue_script('angular-ui-router', plugins_url( 'lib/angular-ui-router.min.js', __FILE__ ), array(), true);
wp_enqueue_script('googlemap', 'https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyDxcqlp2yAzg0UeyqkZHCLebZx8Qq96XYk', array(), true);

wp_enqueue_script('ng-map', plugins_url( 'lib/ng-map.min.js', __FILE__ ), array(), true);
//wp_enqueue_script('googlemap', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDxcqlp2yAzg0UeyqkZHCLebZx8Qq96XYk&callback=initMap', array(), true);



// Creating the widget
class livewell_search extends WP_Widget {

function __construct() {
parent::__construct(

// Base ID of your widget
'livewell_search',

// Widget name will appear in UI
__('Livewell Local search', 'livewell_search_domain'),

// Widget description
array( 'description' => __( 'Widget FOR livewell search', 'livewell_search_domain' ), )
);
}

// Creating widget front-end

public function widget( $args, $instance ) {
echo '<div ng-app="LWLsearch">
        <ui-view></ui-view>
	</div>';
}

// Widget Backend
public function form( $instance ) {
if ( isset( $instance[ 'FooterText' ] ) ) {
$FooterText = $instance[ 'FooterText' ];
}
else {
$FooterText = __( 'New FooterText', 'livewell_search_domain' );
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
}

/* Stop Adding Functions Below this Line */
?>
