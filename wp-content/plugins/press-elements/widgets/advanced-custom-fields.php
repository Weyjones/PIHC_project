<?php

namespace PressElements\Widgets;

use  Elementor\Widget_Base ;
use  Elementor\Controls_Manager ;
use  Elementor\Scheme_Color ;
use  Elementor\Scheme_Typography ;
use  Elementor\Group_Control_Typography ;
use  Elementor\Group_Control_Border ;
use  Elementor\Group_Control_Box_Shadow ;
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) {
    die;
}
/**
 * Press Elements Advanced Custom Fields
 *
 * Advanced Custom Fields element for elementor.
 *
 * @since 1.4.0
 */
class Press_Elements_Advanced_Custom_Fields extends Widget_Base
{
    public function get_name()
    {
        return 'advanced-custom-fields';
    }
    
    public function get_title()
    {
        return __( 'Advanced Custom Fields', 'press-elements' );
    }
    
    public function get_icon()
    {
        return 'fa fa-plus-square';
    }
    
    public function get_categories()
    {
        return array( 'press-elements-integrations' );
    }
    
    protected function _register_controls()
    {
        
        if ( !is_plugin_active( 'advanced-custom-fields/acf.php' ) && !class_exists( 'acf' ) ) {
            $this->start_controls_section( 'section_missing_plugin', array(
                'label' => __( 'Advanced Custom Fields', 'press-elements' ),
            ) );
            $this->add_control( 'missing_plugin', array(
                'type'      => Controls_Manager::RAW_HTML,
                'raw'       => '<div class="elementor-panel-nerd-box">
							<i class="elementor-panel-nerd-box-icon fa fa-lock"></i>
							<div class="elementor-panel-nerd-box-title">' . __( 'Pugin is Missing', 'press-elements' ) . '</div>
							<div class="elementor-panel-nerd-box-message">' . sprintf( __( 'This feature requires "%s" plugin to be installed and active.', 'press-elements' ), '<strong>' . __( 'Advanced Custom Fields', 'press-elements' ) . '</strong>' ) . '</div>
						</div>',
                'separator' => 'none',
            ) );
            $this->end_controls_section();
            return;
        }
        
        $this->start_controls_section( 'section_pro_feature', array(
            'label' => __( 'Advanced Custom Fields', 'press-elements' ),
        ) );
        $this->add_control( 'pro_feature', array(
            'type'      => Controls_Manager::RAW_HTML,
            'raw'       => '<div class="elementor-panel-nerd-box">
							<i class="elementor-panel-nerd-box-icon fa fa-lock"></i>
							<div class="elementor-panel-nerd-box-title">' . __( 'Premium Feature', 'press-elements' ) . '</div>
							<div class="elementor-panel-nerd-box-message">' . sprintf( __( 'This feature is only available on "%s".', 'press-elements' ), '<strong>' . __( 'Press Elements Pro', 'press-elements' ) . '</strong>' ) . '</div>
							<a class="elementor-panel-nerd-box-link elementor-button elementor-button-default elementor-go-pro" href="' . press_elements_freemius()->get_upgrade_url() . '" target="_blank">' . __( 'Upgrade Now!', 'press-elements' ) . '</a>
						</div>',
            'separator' => 'none',
        ) );
        $this->end_controls_section();
    }
    
    protected function render()
    {
        // Check if "acf" is active
        if ( !is_plugin_active( 'advanced-custom-fields/acf.php' ) && !class_exists( 'acf' ) ) {
            return;
        }
    }
    
    protected function _content_template()
    {
    }

}