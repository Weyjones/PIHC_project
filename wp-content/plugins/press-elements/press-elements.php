<?php
/**
 * Plugin Name: Press Elements - Widgets for Elementor
 * Description: Easy-to-use widgets that help you display and design your content using Elementor page builder.
 * Plugin URI:  https://wordpress.org/plugins/press-elements/
 * Version:     1.7.0
 * Author:      Press Elements
 * Author URI:  https://press-elements.com/
 * Text Domain: press-elements
 */



// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}



// Make sure the same class is not loaded twice in free/premium versions.
if ( ! class_exists( 'Press_Elements' ) ) {

	/**
	 * Main Press Elements Class
	 *
	 * The init class that runs the Press Elements plugin.
	 *
	 * @since 1.7.0
	 */
	final class Press_Elements {

		/**
		 * Instance
		 *
		 * @since 1.7.0
		 *
		 * @var Press_Elements The single instance of the class.
		 *
		 * @access private
		 * @static
		 */
		private static $_instance = null;

		/**
		 * Press Elements Version
		 *
		 * @since 1.7.0
		 *
		 * @var string The plugin version.
		 *
		 * @access public
		 */
		public $version = '1.7.0';

		/**
		 * Minumum Elementor Version
		 *
		 * @since 1.7.0
		 *
		 * @var string Minimum Elementor version required to run the plugin.
		 *
		 * @access public
		 */
		public $minimum_elementor_version = '1.3.4';

		/**
		 * Minumum PHP Version
		 *
		 * @since 1.7.0
		 *
		 * @var string Minimum PHP version required to run the plugin.
		 *
		 * @access public
		 */
		public $minimum_php_version = '5.4';

		/**
		 * Instance
		 *
		 * Ensures only one instance of the class is loaded or can be loaded.
		 *
		 * @since 1.7.0
		 *
		 * @access public
		 * @static
		 *
		 * @return Press_Elements An instance of the class.
		 */
		public static function instance() {

			if ( is_null( self::$_instance ) ) {
				self::$_instance = new self();
			}
			return self::$_instance;

		}

		/**
		 * Clone
		 *
		 * Disable class cloning.
		 *
		 * @since  1.7.0
		 *
		 * @access protected
		 *
		 * @return void
		 */
		public function __clone() {

			// Cloning instances of the class is forbidden
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'press-elements' ), '1.7.0' );

		}

		/**
		 * Wakeup
		 *
		 * Disable unserializing the class.
		 *
		 * @since  1.7.0
		 *
		 * @access protected
		 *
		 * @return void
		 */
		public function __wakeup() {

			// Unserializing instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'press-elements' ), '1.7.0' );

		}

		/**
		 * Constructor
		 *
		 * @since 1.7.0
		 *
		 * @access public
		 */
		public function __construct() {

			$this->includes();
			$this->init_hooks();

			do_action( 'press_elements_loaded' );

		}

		/**
		 * Include Files
		 *
		 * Load required plugin core files.
		 *
		 * @since 1.7.0
		 *
		 * @access public
		 */
		public function includes() {

			require_once( __DIR__ . '/press-elements-freemius.php' );
			require_once( __DIR__ . '/press-elements-admin.php' );
			require_once( __DIR__ . '/press-elements-plugin.php' );

		}

		/**
		 * Init Hooks
		 *
		 * Hook into actions and filters.
		 *
		 * @since 1.7.0
		 *
		 * @access private
		 */
		private function init_hooks() {

			add_action( 'init', [ $this, 'i18n' ] );
			add_action( 'plugins_loaded', [ $this, 'init' ] );

		}

		/**
		 * Load Textdomain
		 *
		 * Load plugin localization files.
		 *
		 * @since 1.7.0
		 *
		 * @access public
		 */
		public function i18n() {

			load_plugin_textdomain( 'press-elements' );

		}
		/**
		 * Init Press Elements
		 *
		 * Load the plugin after Elementor (and other plugins) are loaded.
		 *
		 * @since 1.0.0
		 * @since 1.7.0 The logic moved from a standalone function to this class method.
		 *
		 * @access public
		 */
		public function init() {

			// Press Elements Admin - displays even if Elementor is not active
			new \PressElements\Admin();

			// Check if Elementor installed and actived
			if ( ! did_action( 'elementor/loaded' ) ) {
				add_action( 'admin_notices', [ $this, 'admin_notice_missing_main_plugin' ] );
				return;
			}

			// Check for required Elementor version
			if ( ! version_compare( ELEMENTOR_VERSION, $this->minimum_elementor_version, '>=' ) ) {
				add_action( 'admin_notices', [ $this, 'admin_notice_minimum_elementor_version' ] );
				return;
			}

			// Check for required PHP version
			if ( version_compare( PHP_VERSION, $this->minimum_php_version, '<' ) ) {
				add_action( 'admin_notices', [ $this, 'admin_notice_minimum_php_version' ] );
				return;
			}

			// Press Elements Plugin
			new \PressElements\Plugin();

		}

		/**
		 * Admin notice
		 *
		 * Warning when the site doesn't have Elementor installed or activated.
		 *
		 * @since 1.1.0
		 * @since 1.7.0 Moved from a standalone function to a class method.
		 *
		 * @access public
		 */
		public function admin_notice_missing_main_plugin() {

			$message = sprintf(
				/* translators: 1: Press Elements 2: Elementor */
				esc_html__( '"%1$s" requires "%2$s" to be installed and activated.', 'press-elements' ),
				'<strong>' . esc_html__( 'Press Elements', 'press-elements' ) . '</strong>',
				'<strong>' . esc_html__( 'Elementor', 'press-elements' ) . '</strong>'
			);
			printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );

		}

		/**
		 * Admin notice
		 *
		 * Warning when the site doesn't have a minimum required Elementor version.
		 *
		 * @since 1.1.0
		 * @since 1.7.0 Moved from a standalone function to a class method.
		 *
		 * @access public
		 */
		public function admin_notice_minimum_elementor_version() {

			$message = sprintf(
				/* translators: 1: Press Elements 2: Elementor 3: Required Elementor version */
				esc_html__( '"%1$s" requires "%2$s" version %3$s or greater.', 'press-elements' ),
				'<strong>' . esc_html__( 'Press Elements', 'press-elements' ) . '</strong>',
				'<strong>' . esc_html__( 'Elementor', 'press-elements' ) . '</strong>',
				 $this->minimum_elementor_version
			);
			printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );

		}

		/**
		 * Admin notice
		 *
		 * Warning when the site doesn't have a minimum required PHP version.
		 *
		 * @since 1.7.0
		 *
		 * @access public
		 */
		public function admin_notice_minimum_php_version() {

			$message = sprintf(
				/* translators: 1: Press Elements 2: PHP 3: Required Elementor version */
				esc_html__( '"%1$s" requires "%2$s" version %3$s or greater.', 'press-elements' ),
				'<strong>' . esc_html__( 'Press Elements', 'press-elements' ) . '</strong>',
				'<strong>' . esc_html__( 'PHP', 'press-elements' ) . '</strong>',
				 $this->minimum_php_version
			);
			printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );

		}

	}

}



// Make sure the same function is not loaded twice in free/premium versions.
if ( ! function_exists( 'press_elements_load' ) ) {

	/**
	 * Load Press Elements
	 *
	 * Main instance of Press_Elements.
	 *
	 * @since 1.0.0
	 * @since 1.7.0 The logic moved from this function to a class method.
	 */
	function press_elements_load() {

		return Press_Elements::instance();

	}

	// Run Press Elements
	press_elements_load();

}
