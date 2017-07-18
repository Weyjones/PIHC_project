<?php
/*
Plugin Name: LiveWell searchbar
Description: LiveWell searchbar Plugin
*/
/* Start Adding Functions Below this Line */

// Register and load the widget
function liveWell_searchbar_widget() {
	register_widget( 'liveWell_searchbar' );
}
add_action( 'widgets_init', 'liveWell_searchbar_widget' );
wp_enqueue_style( 'searchbar.css', plugins_url( 'searchbar.css', __FILE__ ) );
// Creating the widget
class liveWell_searchbar extends WP_Widget {

function __construct() {
parent::__construct(

// Base ID of your widget
'liveWell_searchbar',

// Widget name will appear in UI
__('LiveWell searchbar', 'liveWell_searchbar_domain'),

// Widget description
array( 'description' => __( 'Widget FOR LiveWells searchbar ', 'liveWell_searchbar_domain' ), )
);
}

// Creating widget front-end

public function widget( $args, $instance ) {
echo '<form class="search-container" action="/livewell-search/#!/" method="get">
    <input type="text" id="search-bar" name="query" placeholder="What are you looking for?">
    <button type="submit" class="search-icon"><i class="fa fa-search"></i><span class="sr-only">Search</span></button>
  </form>';
}

// Widget Backend
public function form( $instance ) {
if ( isset( $instance[ 'FooterText' ] ) ) {
$FooterText = $instance[ 'FooterText' ];
}
else {
$FooterText = __( 'New FooterText', 'liveWell_searchbar_domain' );
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
} // Class liveWell_searchbar ends here

/* Stop Adding Functions Below this Line */
?>
