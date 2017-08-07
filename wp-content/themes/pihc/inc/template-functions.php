<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package pihc
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function pihc_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	return $classes;
}
add_filter( 'body_class', 'pihc_body_classes' );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function pihc_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', 'pihc_pingback_header' );

add_filter('um_account_page_default_tabs_hook', 'favorite_in_um', 100 );
function favorite_in_um( $tabs ) {
	$tabs[800]['favorite']['icon'] = 'um-faicon-star';
	$tabs[800]['favorite']['title'] = 'Favorite Programs';
	$tabs[800]['favorite']['custom'] = true;
	return $tabs;
}

/* make our new tab hookable */

add_action('um_account_tab__favorite', 'um_account_tab__favorite');
function um_account_tab__favorite( $info ) {
	global $ultimatemember;
	extract( $info );

	$output = $ultimatemember->account->get_tab_output('favorite');
	if ( $output ) { echo $output; }
}

/* Finally we add some content in the tab */

add_filter('um_account_content_hook_favorite', 'um_account_content_hook_favorite');
function um_account_content_hook_favorite( $output ){
	ob_start();
	?>

	<div class="um-field">

		<!-- Here goes your custom content -->
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th class="manage-column column-primary">
                        Program Name
                    </th>
                    <th class="manage-column column-primary">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <?php
                global $post;
                $args = array(
                    'post_type'        => 'favorite_program',
                    'post_status'      => 'publish',
                    'numberposts'       => -1,
                    'author'           => get_current_user_id()
                );
                $myposts = get_posts( $args );

                foreach ( $myposts as $post ) :
                  setup_postdata( $post );
                  $url = $post->post_excerpt;?>
                    <tr>
                        <td>
                            <a href="<?php  echo $url; ?>"><?php the_title(); ?></a>
                        </td>
                        <td>
                        <?php if (current_user_can('delete_post', $post->ID)) {?>
                            <a href="<?php echo get_delete_post_link($post->ID); ?>">delete</a>
                        <?php } ?>
                        </td>
                    </tr>
                <?php endforeach;
                wp_reset_postdata(); ?>
            </tbody>
        </table>
	</div>

	<?php

	$output .= ob_get_contents();
	ob_end_clean();
	return $output;
}

add_filter('um_account_page_default_tabs_hook', 'saved_search_in_um', 100 );
function saved_search_in_um( $tabs ) {
	$tabs[800]['saved_search']['icon'] = 'um-faicon-heart';
	$tabs[800]['saved_search']['title'] = 'Saved Search';
	$tabs[800]['saved_search']['custom'] = true;
	return $tabs;
}

/* make our new tab hookable */

add_action('um_account_tab__saved_search', 'um_account_tab__saved_search');
function um_account_tab__saved_search( $info ) {
	global $ultimatemember;
	extract( $info );

	$output = $ultimatemember->account->get_tab_output('saved_search');
	if ( $output ) { echo $output; }
}

/* Finally we add some content in the tab */

add_filter('um_account_content_hook_saved_search', 'um_account_content_hook_saved_search');
function um_account_content_hook_saved_search( $output ){
	ob_start();
	?>

	<div class="um-field">

		<!-- Here goes your custom content -->
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th class="manage-column column-primary">
                        Search
                    </th>
                    <th class="manage-column column-primary">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <?php
                global $post;
                $args = array(
                    'post_type'        => 'saved_search',
                    'numberposts'       => -1,
                    'post_status'      => 'publish',
                    'author'           => get_current_user_id()
                );
                $myposts = get_posts( $args );

                foreach ( $myposts as $post ) :
                  setup_postdata( $post );
                  $url = $post->post_excerpt;?>
                    <tr>
                        <td>
                        <a href="<?php  echo $url; ?>"><?php the_title(); ?></a>
                        </td>
                        <td>
                            <?php if (current_user_can('delete_post', $post->ID)) {?>
                                <a href="<?php echo get_delete_post_link($post->ID); ?>">delete</a>
                            <?php } ?>
                        </td>
                    </tr>
                <?php endforeach;
                wp_reset_postdata(); ?>
            </tbody>
        </table>
	</div>

	<?php

	$output .= ob_get_contents();
	ob_end_clean();
	return $output;
}