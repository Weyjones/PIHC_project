<?php
/*
Plugin Name: LiveWell slide tabs
Description: LiveWell slide tabs Plugin
*/
/* Start Adding Functions Below this Line */

// Register and load the widget
function liveWell_slideTabs_widget() {
	register_widget( 'liveWell_slideTabs' );
}

add_action( 'widgets_init', 'liveWell_slideTabs_widget' );

//wp_enqueue_script( 'jquery-slide', '' . 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.js', array(), true );
wp_enqueue_style( 'slideTabs-style.css', plugins_url( 'style.css', __FILE__ ) );
wp_enqueue_script('slideTabs-script.js', plugins_url( 'script.js', __FILE__ ), array('jquery'));


// Creating the widget
class liveWell_slideTabs extends WP_Widget {

function __construct() {
parent::__construct(

// Base ID of your widget
'liveWell_slideTabs',

// Widget name will appear in UI
__('LiveWell slide tabs', 'liveWell_slideTabs_domain'),

// Widget description
array( 'description' => __( 'Widget FOR LiveWell slide tabs ', 'liveWell_slideTabs_domain' ), )
);
}

// Creating widget front-end

public function widget( $args, $instance ) {
echo '<div class="center-div">
        <div id="liveWell-slideTabs">
          <div class="slidetabs-background" id="slideTabs-tab0">
            <div class="banner"></div>
            <div class="content">
                <div class="desc-section">
                    <h3 class="header">
                        Emotional & Spiritual Health
                    </h3>
                    <p class="desc">

                    </p>
                </div>';
echo bellows( 'main' , array( 'menu' => 4 ) );
echo '
            </div>
          </div>
          <div class="slidetabs-background" id="slideTabs-tab1">
            <div class="banner"></div>
            <div class="content">
                <div class="desc-section">
                    <h3 class="header">
                        Neighborhood & Environment
                    </h3>
                    <p class="desc">

                    </p>
                </div>';
echo bellows( 'main' , array( 'menu' => 5 ) );
echo '
            </div>
          </div>
          <div class="slidetabs-background" id="slideTabs-tab2">
            <div class="banner"></div>
            <div class="content">
                <div class="desc-section">
                    <h3 class="header">
                        Physical Health
                    </h3>
                    <p class="desc">

                    </p>
                </div>';
echo bellows( 'main' , array( 'menu' => 6 ) );
echo '
            </div>
          </div>
          <div class="slidetabs-background" id="slideTabs-tab3">
            <div class="banner"></div>
            <div class="content">
                <div class="desc-section">
                    <h3 class="header">
                        Relationships & Social connections
                    </h3>
                    <p class="desc">

                    </p>
                </div>';
echo bellows( 'main' , array( 'menu' => 7 ) );
echo '
            </div>
          </div>
            <div class="slidetabs-background" id="slideTabs-tab4">
                <div class="banner"></div>
                <div class="content">
                <div class="desc-section">
                    <h3 class="header">
                        Security & Basic Needs
                    </h3>
                    <p class="desc">

                    </p>
                </div>';
echo bellows( 'main' , array( 'menu' => 8 ) );
echo '
                </div>
            </div>
          <div class="slidetabs-background" id="slideTabs-tab5">
            <div class="banner"></div>
            <div class="content">
                <div class="desc-section">
                    <h3 class="header">
                        Work, Learning, & Growth
                    </h3>
                    <p class="desc">
                        Use available resources to develop and create opportunities that contribute to your unique gifts, skills and talents!
                    </p>
                </div>';
echo bellows( 'main' , array( 'menu' => 9 ) );
echo '

            </div>
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
$FooterText = __( 'New FooterText', 'liveWell_slideTabs_domain' );
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
} // Class liveWell_slideTabs ends here

/* Stop Adding Functions Below this Line */
?>
