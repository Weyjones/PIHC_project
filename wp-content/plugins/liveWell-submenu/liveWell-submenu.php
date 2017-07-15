<?php
/*
Plugin Name: LiveWell submenu
Description: LiveWell submenu Plugin
*/
/* Start Adding Functions Below this Line */

// Register and load the widget
function liveWell_submenu_widget() {
	register_widget( 'liveWell_submenu' );
}
add_action( 'widgets_init', 'liveWell_submenu_widget' );

// Creating the widget
class liveWell_submenu extends WP_Widget {

function __construct() {
parent::__construct(

// Base ID of your widget
'liveWell_submenu',

// Widget name will appear in UI
__('LiveWell submenu', 'liveWell_submenu_domain'),

// Widget description
array( 'description' => __( 'Widget FOR PIHC footer ', 'liveWell_submenu_domain' ), )
);
}

// Creating widget front-end

public function widget( $args, $instance ) {
echo '<div class="sub-menu" style="background:#ed902f">
	<div class="container">
		<div class="row">

<div class="col-sm-12 col-md-2">
	<div class="diamond" style="background:#f79836">
		<div class="diamond-inner">
			<a href="http://www.pihcsnohomish.org/livewell/">
				<img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/i-live.png" alt="">
				<span>Live Well</span>
			</a>
		</div>
	</div>
</div>
<div class="col-sm-12 col-md-10">
	<div id="breadcrumbs"><a rel="nofollow" href="http://www.pihcsnohomish.org/">Home</a> / LiveWell</div>	<div class="menu-livewell-submenu-container"><ul id="menu-livewell-submenu" class="menu"><li><a href="http://www.pihcsnohomish.org/livewell/pathways-to-health/">Pathways to Health</a></li>
<li><a href="http://www.pihcsnohomish.org/livewell/health-equity/">Health Equity</a></li>
<li><a href="http://www.pihcsnohomish.org/livewell/lifestyle-modification/">Lifestyle Modification Study</a></li>
</ul></div></div>
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
$FooterText = __( 'New FooterText', 'liveWell_submenu_domain' );
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
} // Class liveWell_submenu ends here

/* Stop Adding Functions Below this Line */
?>
