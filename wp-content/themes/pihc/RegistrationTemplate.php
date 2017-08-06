<?php /* Template Name: Registration / Login */ ?>

<?php get_header(); ?>

<header id="header">
	<div class="container-fluid">

		<div class="col-sm-12 col-md-6 site-branding">
			<a href="http://www.pihcsnohomish.org/"><img style="padding-left: 40px" src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/logo.png" alt="" class="logo"></a>
		</div>

		<div class="col-sm-12 col-md-6 site-details">
			<div class="contact-details">
				<div class="container-fluid">
					<ul class="i-social">
						<li><a href="https://www.facebook.com/PIHCSnohomish/" target="_blank" class="fb"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/i-fb.png" alt=""></a></li>
						<li><a href="https://twitter.com/pihcsnohomish" target="_blank" class="fb"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/i-twitter.png" alt=""></a></li>
						<li><a href="https://www.linkedin.com/company/providence-institute-for-a-healthier-community" target="_blank" class="fb"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/i-linkedin.png" alt=""></a></li>
						<li><a href="https://www.youtube.com/channel/UCRJTnV38hMzaBUvgnB7SlDw" target="_blank" class="fb"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/i-youtube.png" alt=""></a></li>
					</ul>
					<div class="contact-info">
						<strong style="color: white; font-size: medium;">COMMUNITY RESOURCE HUB</strong>
					</div>
				</div>
			</div>
		</div>
	</div>
</header><!-- #header -->


<main id="login-main" class="site-main" role="main">
		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			// Include the page content template.
			get_template_part( 'template-parts/content', 'page' );

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) {
				comments_template();
			}

			// End of the loop.
		endwhile;
		?>

</main><!-- .site-main -->

<!--Footer-->
<footer id="footer">
	<div class="container-fluid">
		<div class="col-sm-12 col-md-6 site-details">
			<div class="contact-details">
				<div class="container-fluid">
					<p><div class="contact-info">
						<ul>
							<li>1321 Colby Ave, C4 Room 014, Everett, WA 98201</li>
							<li>Phone: 425.261.3344</li>
							<li>Email: <a href="mailto:PIHC@Providence.org">PIHC@Providence.org</a></li>
						</ul>
					</div></p>
					<p>© 2017 Providence Institute for a Healthier Community. All rights reserved.</p>
				</div>
			</div>
		</div>
		<div class="col-sm-12 col-md-6 site-details">
			<div class="contact-details">
				<div class="container-fluid" style="text-align:right;">
					<p><div class="contact-info">
						<ul>
							<li> <a href="<?php echo get_site_url(); echo'/livehealthy2020/' ;?>">LIVEHEALTHY 2020</a></li>
							<li> <a href="<?php echo get_site_url(); echo'/livewell/' ;?>">LIVEWELL LOCAL</a></li>
							<li> <a href="http://www.pihcsnohomish.org/">PARTNER PORTAL</a></li>
							<li> <a href="">PRIVACY POLICY</a></li>
							<li> <a href="">ACCESSIBILITY POLICY</a></li>
							<li> <a href="">CONTACT US</a></li>
						</ul>
						<ul style="margin-bottom: 0;">
							<li> <a href="<?php echo get_site_url(); echo'/pihc/' ;?>">PIHC SNOHOMISH</a></li>
							<li> <a href="http://WASHINGTON.PROVIDENCE.ORG">WASHINGTON.PROVIDENCE.ORG</a></li>
						</ul>
					</div></p>

				</div>
			</div>
		</div>
	</footer><!-- #colophon -->


<?php get_footer(); ?>
