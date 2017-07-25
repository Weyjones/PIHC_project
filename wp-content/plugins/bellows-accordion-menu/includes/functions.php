<?php

require_once( BELLOWS_DIR . 'includes/asset.loader.php' );
require_once( BELLOWS_DIR . 'includes/skins.php' );
require_once( BELLOWS_DIR . 'includes/widget.php' );


/* Translation files */
add_action( 'plugins_loaded' , 'bellows_load_textdomain' );
function bellows_load_textdomain(){
	$domain = 'bellows';
	load_plugin_textdomain( $domain , false , BELLOWS_BASEDIR.'/languages' );

	$locale = apply_filters( 'plugin_locale', get_locale(), $domain );
	load_textdomain( $domain, trailingslashit( WP_LANG_DIR ) . $domain . '/' . $domain . '-' . $locale . '.mo' );
}



/** Admin Notices **/
function bellows_user_is_admin(){
	return current_user_can( 'manage_options' );
}

function bellows_admin_notice( $content , $echo = true ){
	//$showtips = false;

	if( bellows_op( 'admin_notices' , 'general' ) == 'on' ){
		if( bellows_user_is_admin() ){
			$notice = '<div class="bellows-admin-notice"><i class="bellows-admin-notice-icon fa fa-lightbulb-o"></i>'.$content.'</div>';

			if( $echo ) echo $notice;
			return $notice;
		}
	}

}


add_filter( 'plugin_action_links_'.BELLOWS_BASENAME , 'bellows_action_links' );
function bellows_action_links( $links ) {
	$links[] = '<a href="'. admin_url( 'themes.php?page=bellows-settings' ) .'">Control Panel</a>';
	$links[] = '<a target="_blank" href="'.BELLOWS_KB_URL.'">Knowledgebase</a>';
	return $links;
}


function bellows_get_support_url(){
	return _BELLOWS()->get_support_url();
}




function bellows_get_menu_item_data( $item_id ){
	$meta = get_post_meta( $item_id , BELLOWS_MENU_ITEM_META_KEY , true );

	//Add URL for image
	if( !empty( $meta['item_image'] ) ){
		$src = wp_get_attachment_image_src( $meta['item_image'] );
		if( $src ){
			$meta['item_image_url'] = $src[0];
			$meta['item_image_edit'] = get_edit_post_link( $meta['item_image'], 'raw' );
		}
	}

	return $meta;
}


add_filter( 'wp_nav_menu_args' , 'bellows_force_prefilter' , 1 , 1 );
function bellows_force_prefilter($args){

	if( bellows_op( 'force_override_theme_filters' , 'general' ) != 'off' ){
		if( isset( $args['bellows_config'] ) ){
			$args['bellows_args'] = $args;
		}
	}
	return $args;
}

add_filter( 'wp_nav_menu_args' , 'bellows_force_refilter' , 999999 , 1 );
function bellows_force_refilter($args){
	if( bellows_op( 'force_override_theme_filters' , 'general' ) != 'off' ){
		if( isset( $args['bellows_args'] ) ){
			$args = $args['bellows_args'];
		}
	}
	return $args;
}



function bellp( $d ){
	echo '<pre>';
	print_r( $d );
	echo '</pre>';
}