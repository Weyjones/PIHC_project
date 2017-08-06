<?php
/**
 * pihc functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package pihc
 */

if ( ! function_exists( 'pihc_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function pihc_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on pihc, use a find and replace
	 * to change 'pihc' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'pihc', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'menu-1' => esc_html__( 'Primary', 'pihc' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'pihc_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support( 'custom-logo', array(
		'height'      => 250,
		'width'       => 250,
		'flex-width'  => true,
		'flex-height' => true,
	) );
}
endif;
add_action( 'after_setup_theme', 'pihc_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function pihc_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'pihc_content_width', 640 );
}
add_action( 'after_setup_theme', 'pihc_content_width', 0 );





/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function pihc_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'PIHC Header', 'twentyseventeen' ),
		'id'            => 'pihc-header',
		'description'   => __( 'Add widgets here to appear in phic header.', 'twentyseventeen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'LiveWell Content', 'twentyseventeen' ),
		'id'            => 'liveWell-content',
		'description'   => __( 'Add widgets here to appear in LiveWell content.', 'twentyseventeen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'LiveHealthy Content', 'twentyseventeen' ),
		'id'            => 'liveHealthy-content',
		'description'   => __( 'Add widgets here to appear in LiveHealthy content.', 'twentyseventeen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'LiveWell Search', 'twentyseventeen' ),
		'id'            => 'liveWell-search',
		'description'   => __( 'Add widgets here to appear in LiveWell search.', 'twentyseventeen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'LiveHealthy Search', 'twentyseventeen' ),
		'id'            => 'liveHealthy-search',
		'description'   => __( 'Add widgets here to appear in LiveHealthy search.', 'twentyseventeen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'PIHC Footer', 'twentyseventeen' ),
		'id'            => 'pihc-footer',
		'description'   => __( 'Add widgets here to appear in pihc footer.', 'twentyseventeen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'pihc_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function pihc_scripts() {
	wp_enqueue_style( 'pihc-style', get_stylesheet_uri() );

	wp_enqueue_script( 'pihc-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'jquery-script', '' . 'https://code.jquery.com/jquery-3.2.1.min.js', array(), true );

	wp_enqueue_script( 'pihc-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	wp_localize_script('pihc-navigation', 'magicalData', array('nonce' => wp_create_nonce('wp_rest')));
}
add_action( 'wp_enqueue_scripts', 'pihc_scripts' );

function reg_scripts() {
    wp_enqueue_style( 'style', get_template_directory_uri() . '/style.css' );
		//wp_enqueue_style( 'topic', get_template_directory_uri() . '/layouts/topic.css' );
		wp_enqueue_style( 'dropmenu', get_template_directory_uri() . '/layouts/dropmenu.css' );


    wp_enqueue_style( 'bootstrapthemestyle', '' . 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' );
		wp_enqueue_script( 'jquery-script', '' . 'https://code.jquery.com/jquery-3.2.1.min.js', array(), true );
    wp_enqueue_script( 'bootstrap-script', '' . 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', array(), true );
		//wp_enqueue_script( 'topicJS', get_template_directory_uri() . '/js/topic.js', array(), true );



}
add_action('wp_enqueue_scripts', 'reg_scripts');


/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';
