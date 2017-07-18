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

		add_action( 'admin_enqueue_scripts', array( $this, 'image_assets' ) );
		add_action( 'widgets_init', array( $this, 'image_assets' ) );


	}

	public function image_assets()
	{
			wp_enqueue_script('media-upload');
			wp_enqueue_script('thickbox');
			wp_enqueue_script('mfc-media-upload', plugin_dir_url(__FILE__) . 'mfc-media-upload.js', array( 'jquery' )) ;
			wp_enqueue_style('thickbox');
	}


	// Creating widget front-end

	public function widget( $args, $instance ) {
		echo '<div class="livewell banner" style="background: url('.$instance['image'].') no-repeat top center; background-size:cover">
			<div class="container">
									</div>
		</div>';
	}

	// Widget Backend
	public function form( $instance ) {

		$image = '';
		if(isset($instance['image']))
		{
		    $image = $instance['image'];
		}


		// Widget admin form
		?>
		<p>
		    <label for="<?php echo $this->get_field_name( 'image' ); ?>"><?php _e( 'Image:' ); ?></label>
		    <input name="<?php echo $this->get_field_name( 'image' ); ?>" id="<?php echo $this->get_field_id( 'image' ); ?>" class="widefat" type="text" size="36"  value="<?php echo esc_url( $image ); ?>" />
		    <input class="upload_image_button" type="button" value="Upload Image" />
		</p>
		<?php
	}

	// Updating widget replacing old instances with new
	public function update( $new_instance, $old_instance ) {

		return $new_instance;
	}
} // Class liveWell_background ends here

/* Stop Adding Functions Below this Line */
?>
