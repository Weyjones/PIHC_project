<?php
namespace PressElements;



// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}



/**
 * Admin Page Class
 *
 * Register menu and generate admin pages
 *
 * @since 1.0.0
 */
class Admin {

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function __construct() {

		add_action( 'admin_menu', array( $this, 'register_menus' ) );

	}

	/**
	 * Register Admin Menus
	 *
	 * Register the Dashboard Pages which are later hidden but these pages
	 * are used to render the Welcome and Credits pages.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 *
	 * @return void
	 */
	public function register_menus() {

		/**
		 * User capability to display Press Elements menu.
		 *
		 * Allows developers to filter the required capability to display the settings page.
		 *
		 * @since 1.0.0
		 */
		$capability = apply_filters( 'press_elements_menu_display_capability', 'manage_options' );

		// About
		add_options_page(
			esc_html__( 'Press Elements - Widgets for Elementor', 'press-elements' ),
			esc_html__( 'Press Elements', 'press-elements' ),
			$capability,
			'press-elements',
			array( $this, 'page_layout' )
		);

	}

	/**
	 * Navigation tabs
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 *
	 * @return void
	 */
	public function tabs() {
		$tab = isset( $_GET['tab'] ) ? sanitize_text_field( $_GET['tab'] ) : 'about';
		?>
		<h2 class="nav-tab-wrapper">
			<a class="nav-tab <?php echo ( 'about'           === $tab ) ? 'nav-tab-active' : ''; ?>" href="<?php echo esc_url( admin_url( add_query_arg( array( 'page' => 'press-elements', 'tab' => 'about'           ), 'options-general.php' ) ) ); ?>"><?php esc_html_e( 'About',           'press-elements' ); ?></a>
			<a class="nav-tab <?php echo ( 'getting-started' === $tab ) ? 'nav-tab-active' : ''; ?>" href="<?php echo esc_url( admin_url( add_query_arg( array( 'page' => 'press-elements', 'tab' => 'getting-started' ), 'options-general.php' ) ) ); ?>"><?php esc_html_e( 'Getting Started', 'press-elements' ); ?></a>
			<a class="nav-tab <?php echo ( 'changelog'       === $tab ) ? 'nav-tab-active' : ''; ?>" href="<?php echo esc_url( admin_url( add_query_arg( array( 'page' => 'press-elements', 'tab' => 'changelog'       ), 'options-general.php' ) ) ); ?>"><?php esc_html_e( 'Changelog',       'press-elements' ); ?></a>
			<a class="nav-tab" href="<?php echo press_elements_freemius()->get_upgrade_url(); ?>"><?php esc_html_e( 'Pricing', 'press-elements' ); ?></a>
			<a class="nav-tab" href="<?php echo press_elements_freemius()->get_account_url(); ?>"><?php esc_html_e( 'Account', 'press-elements' ); ?></a>
			<a class="nav-tab" href="https://wordpress.org/support/plugin/press-elements" target="_blank"><?php esc_html_e( 'Support Forum', 'press-elements' ); ?></a>
		</h2>
		<?php
	}

	/**
	 * Render Page Layout
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 *
	 * @return void
	 */
	public function page_layout() {
		$tab = isset( $_GET['tab'] ) ? sanitize_text_field( $_GET['tab'] ) : 'about';

		switch ( $tab ) {
			case 'changelog':
				$this->changelog_screen();
				break;
			case 'getting-started':
				$this->getting_started_screen();
				break;
			case 'about':
			default:
				$this->about_screen();
				break;
		}
	}

	/**
	 * About Screen
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 *
	 * @return void
	 */
	public function about_screen() {
		?>
		<div class="wrap about-wrap">

			<h1><?php esc_html_e( 'Press Elements - Widgets for Elementor', 'press-elements' ); ?></h1>

			<p class="about-text"><?php esc_html_e( 'Easy-to-use widgets that help you display and design your content using Elementor page builder.', 'press-elements' );?></p>

			<?php $this->tabs(); ?>

			<p class="about-text"><?php esc_html_e( 'Press Elements combines the simplicity of Elementor with the efficiency of the built-in WordPress theme components.', 'press-elements' ); ?></p>

			<div class="feature-section two-col">

				<div class="col">

					<h3><?php esc_html_e( 'WordPress Elements', 'press-elements' ); ?></h3>

					<p class="about-text"><?php esc_html_e( 'When you create a new post (or a page) on WordPress, you choose a title, write an excerpt, select a publish date, add an author, choose featured image, select several taxonomies and maybe you define some custom fields.', 'press-elements' ); ?></p>

					<p class="about-text"><?php esc_html_e( 'In the Elementor page builder you can\'t display and style those components. You need to repeat the process and manually add a title, write the excerpt and add images.', 'press-elements' ); ?></p>

					<p class="about-text"><?php esc_html_e( 'That\'s where Press Elements comes in handy. The plugin adds smart widgets that let you display those post components. Now you can drag a "Post Title" widget and style it your way. The widget will automatically insert the title used as the post title. Same applies for all the other post components.', 'press-elements' ); ?></p>

					<h3><?php esc_html_e( 'Dynamic Content', 'press-elements' ); ?></h3>

					<p class="about-text"><?php esc_html_e( 'Regular Elementor widgets save the data as hard-coded content in the database. To change something you need to open the page builder and manually change the element inside the builder. Updating post titles, excerpts, authors and other WordPress Element won\'t affect the builder.', 'press-elements' ); ?></p>

					<p class="about-text"><?php esc_html_e( 'Press Elements uses dynamic content architecture. It doesn\'t save the title and other element as hard-coded content. It generates them on-the-fly. Just like the WordPress theme system.', 'press-elements' ); ?></p>

					<p class="about-text"><?php esc_html_e( 'When you change post titles and other post elements from your WordPress dashboard (outside of Elementor), they will be automatically updated in the content area and in the page builder.', 'press-elements' ); ?></p>

					<p class="about-text"><?php esc_html_e( 'For example, you can bulk edit several posts from your sites dashboard to change the author, post that use "Post Author" widget will be automatically updates with the new data.', 'press-elements' ); ?></p>

					<h3><?php esc_html_e( 'Template Design', 'press-elements' ); ?></h3>

					<p class="about-text"><?php esc_html_e( 'When using page builders, you need to create all the page element for each page over and over again. Currently you can\'t design single page templates and apply the design on the post. When you use the template system you need to manually change titles and images for each post/page.', 'press-elements' ); ?></p>

					<p class="about-text"><?php esc_html_e( 'With Press Elements you can create custom designs with post elements and save them as template. When you apply the template on other posts, it will inherit the data from the new post. No more manual updates!', 'press-elements' ); ?></p>

					<p class="about-text"><?php esc_html_e( 'You don\'t need to hire developers to generate custom page templates - with Press Elements you can do it using a simple drag & drop interface! Now you can design different templates for different blog posts, pages and other Post Types. When creating new posts, load your predefined templates from your template library.', 'press-elements' ); ?></p>

					<p class="about-text"><?php esc_html_e( 'With Press Elements you can use Elementor widgets to display and design your post elements! Just like developers use theme-functions to generate themes. How cool is that?!', 'press-elements' ); ?></p>

					<h3><?php esc_html_e( 'Included Widgets', 'press-elements' ); ?></h3>

					<p style="text-decoration: underline;"><?php esc_html_e( 'Site Elements:', 'press-elements' ); ?></p>
					<ol>
						<li><?php esc_html_e( 'Site Title', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Site Description', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Site Logo', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Site Counters', 'press-elements' ); ?></li>
					</ol>
					<p style="text-decoration: underline;"><?php esc_html_e( 'Post Elements:', 'press-elements' ); ?></p>
					<ol>
						<li><?php esc_html_e( 'Post Title', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Post Excerpt', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Post Date', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Post Author', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Post Terms', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Post Featured Image (Pro)', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Post Custom Field (Pro)', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Post Comments', 'press-elements' ); ?></li>
					</ol>
					<p style="text-decoration: underline;"><?php esc_html_e( 'Effects:', 'press-elements' ); ?></p>
					<ol>
						<li><?php esc_html_e( 'Image Accordion (Pro)', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Before After Effect (Pro)', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Notes (Pro)', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Typing Effect', 'press-elements' ); ?></li>
					</ol>
					<p style="text-decoration: underline;"><?php esc_html_e( 'Integrations:', 'press-elements' ); ?></p>
					<ol>
						<li><?php esc_html_e( 'Advanced Custom Fields (Pro)', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Gravatar (Pro)', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Flickr (Pro)', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Pinterest (Pro)', 'press-elements' ); ?></li>
					</ol>

					<h3><?php esc_html_e( 'Coming Soon', 'press-elements' ); ?></h3>

					<p style="text-decoration: underline;"><?php esc_html_e( 'Site Elements:', 'press-elements' ); ?></p>
					<ol>
						<li><?php esc_html_e( 'Login Form', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Search Form', 'press-elements' ); ?></li>
					</ol>
					<p style="text-decoration: underline;"><?php esc_html_e( 'Comments Elements:', 'press-elements' ); ?></p>
					<ol>
						<li><?php esc_html_e( 'Comments Form', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Comments List', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Comments Pagination', 'press-elements' ); ?></li>
					</ol>
					<p style="text-decoration: underline;"><?php esc_html_e( 'Effects:', 'press-elements' ); ?></p>
					<ol>
						<li><?php esc_html_e( 'News Ticker', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Timeline', 'press-elements' ); ?></li>
						<li><?php esc_html_e( 'Image Hotspots', 'press-elements' ); ?></li>
					</ol>

				</div>

				<div class="col">

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-1.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-1.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Post edit screen with WordPress elements.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Post edit screen with WordPress elements.', 'press-elements' ); ?></figcaption>
					</figure>

					<br>

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-2.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-2.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Elementor widgets for each site and post element.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Elementor widgets for each site and post element.', 'press-elements' ); ?></figcaption>
					</figure>

					<br>

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-3.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-3.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Styling post title with a dedicated Elementor widget.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Styling post title with a dedicated Elementor widget.', 'press-elements' ); ?></figcaption>
					</figure>

					<br>

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-4.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-4.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Display post custom fields.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Display post custom fields.', 'press-elements' ); ?></figcaption>
					</figure>

					<br>

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-5.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-5.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Create your own author bio section.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Create your own author bio section.', 'press-elements' ); ?></figcaption>
					</figure>

					<br>

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-6.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-6.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Widgets for your site logo, site name and site description.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Widgets for your site logo, site name and site description.', 'press-elements' ); ?></figcaption>
					</figure>

					<br>

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-7.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-7.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Site counters for Post Types, Taxonomies, Comments and Users.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Site counters for Post Types, Taxonomies, Comments and Users.', 'press-elements' ); ?></figcaption>
					</figure>

					<br>

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-8.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-8.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Custom fields as text fields and images, and linking to other custom fields.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Custom fields as text fields and images, and linking to other custom fields.', 'press-elements' ); ?></figcaption>
					</figure>

					<br>

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-9.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-9.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Display Gravatars based on an email address.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Display Gravatars based on an email address.', 'press-elements' ); ?></figcaption>
					</figure>

					<br>

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-10.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-10.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Display Flickr photostream based on Flickr User ID.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Display Flickr photostream based on Flickr User ID.', 'press-elements' ); ?></figcaption>
					</figure>

					<br>

					<figure>
						<a href="<?php echo esc_url( plugins_url( 'screenshot-11.png', __FILE__ ) ); ?>" target="_blank">
							<img src="<?php echo esc_url( plugins_url( 'screenshot-11.png', __FILE__ ) ); ?>" alt="<?php esc_attr_e( 'Display Pinterest pins based on Pinterest username.', 'press-elements' ); ?>">
						</a>
						<figcaption><?php esc_html_e( 'Display Pinterest pins based on Pinterest username.', 'press-elements' ); ?></figcaption>
					</figure>

				</div>

			</div>

		</div>
		<?php
	}

	/**
	 * Getting Started Screen
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 *
	 * @return void
	 */
	public function getting_started_screen() {
		?>
		<div class="wrap about-wrap get-started">

			<h1><?php esc_html_e( 'Getting Started', 'press-elements' ); ?></h1>

			<p class="about-text"><?php esc_html_e( 'Welcome to Press Elements getting started guide.', 'press-elements' ); ?></p>

			<?php $this->tabs(); ?>

			<p class="about-text"><?php esc_html_e( 'Getting started with Press Elements is easy! We put together this quick start guide to help first time users of the plugin. Our goal is to get you up and running in no time. Let\'s begin!', 'press-elements' ); ?></p>

			<div class="feature-section">

				<div class="col">

					<h3><?php esc_html_e( 'STEP 1: Create a new post', 'press-elements' ); ?></h3>

					<p class="about-text"><?php esc_html_e( 'Navigate to "Posts" > "Add New" to create a new post. Enter a post title, write an excerpt, select a featured image, set an author, select a publish date and publish the post.', 'press-elements' ); ?></p>

				</div>

			</div>

			<div class="feature-section">

				<div class="col">

					<h3><?php esc_html_e( 'STEP 2: Design your own template', 'press-elements' ); ?></h3>

					<p class="about-text"><?php esc_html_e( 'Click the "Edit with Elementor" button and start designing the page layout. Design a page header, footer, and the content area.', 'press-elements' ); ?></p>

					<p class="about-text"><?php esc_html_e( 'Use "Press Elements" widgets to display the post title, post excerpt, post date and the other fields used by WordPress. Don\'t forget to style those elements!', 'press-elements' ); ?></p>

				</div>

			</div>

			<div class="feature-section">

				<div class="col">

					<h3><?php esc_html_e( 'STEP 3: Save the template', 'press-elements' ); ?></h3>

					<p class="about-text"><?php esc_html_e( 'Click on the "Add Template" button located at the bottom, and save the design. You will see the newly created template at the "My Templates" tab.', 'press-elements' ); ?></p>

					<p class="about-text"><?php esc_html_e( 'You can save several templates for blogs posts, pages, and other post types. Or even several templates for a particular post type.', 'press-elements' ); ?></p>

				</div>

			</div>

			<div class="feature-section">

				<div class="col">

					<h3><?php esc_html_e( 'STEP 4: Apply the design to new posts', 'press-elements' ); ?></h3>

					<p class="about-text"><?php esc_html_e( 'For each new post you create, load the desired template and apply it to the post. The post will enherite the design but the elements will be updated with the current post data.', 'press-elements' ); ?></p>

				</div>

			</div>

		</div>
		<?php
	}

	/**
	 * Changelog Screen
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 *
	 * @return void
	 */
	public function changelog_screen() {
		?>
		<div class="wrap about-wrap">

			<h1><?php esc_html_e( 'Changelog', 'press-elements' ); ?></h1>

			<p class="about-text"><?php esc_html_e( 'Press Elements changelog.', 'press-elements' ); ?></p>

			<?php $this->tabs(); ?>

			<p class="about-text"><?php esc_html_e( 'The Press Elements plugin is developed continuasly, this is the full changelog.', 'press-elements' ); ?></p>

			<?php echo $this->parse_readme(); ?>

		</div>
		<?php
	}

	/**
	 * Parse the readme.txt file
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 *
	 * @return string $readme HTML formatted readme file
	 */
	public function parse_readme() {
		$file = file_exists( plugin_dir_path( __FILE__ ) . '/readme.txt' ) ? plugin_dir_path( __FILE__ ) . '/readme.txt' : null;

		if ( ! $file ) {
			$readme = '<p>' . esc_html__( 'No valid changelog was found.', 'press-elements' ) . '</p>';
		} else {
			$readme = file_get_contents( $file );
			$readme = nl2br( esc_html( $readme ) );
			$readme = explode( '== Changelog ==', $readme );
			$readme = end( $readme );

			$readme = preg_replace( '/`(.*?)`/', '<code>\\1</code>', $readme );
			$readme = preg_replace( '/\*\*(.*?)\*\*/', '<strong>\\1</strong>', $readme );
			$readme = preg_replace( '/\*(.*?)\*/', ' <em>\\1</em>', $readme );
			$readme = preg_replace( '/= (.*?) =/', '<h3>\\1</h3>', $readme );
			$readme = preg_replace( '/\[(.*?)\]\((.*?)\)/', '<a href="\\2">\\1</a>', $readme );
		}

		return $readme;
	}

}
