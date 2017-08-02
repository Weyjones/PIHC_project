<?php /* Template Name: Resource Hub */ ?>

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

<!--Banner-->
<div class=" banner" style="background: url('<?php the_field(banner_image); ?>') no-repeat top center; background-size:cover">
</div>'


<!--Menu-->
<div class="sub-menu" style="background:<?php the_field(menu_color); ?>">
<div class="container-fluid">
	<div class="row">

<div class="col-sm-12 col-md-1">
</div>
<div class="col-sm-12 col-md-2">
<div class="diamond" style="background:<?php the_field(menu_color); ?>">
	<div class="diamond-inner">
		<a href="http://www.pihcsnohomish.org/livewell/">
			<img src="<?php the_field(menu_icon); ?>" alt="">
			<span>PIHC</span>
		</a>
	</div>
</div>
</div>
<div class="col-sm-12 col-md-9">
<div id="breadcrumbs"><a rel="nofollow" href="http://www.pihcsnohomish.org/"><?php the_field(menu_title); ?></a></div>	<div class="menu-livewell-submenu-container"><ul id="menu-livewell-submenu" class="menu">
<?php
	$menulinks = get_field( 'menu_links' );
	if ( $menulinks ) {
		foreach ( $menulinks['body'] as $links ) {
			echo '<li><a href="';
			echo $links[1]['c'];
			echo '">';
			echo $links[0]['c'];
			echo '</a></li>';
    }
	}
?>

<li class="dropdown"><a href="" class="dropbtn">HELPFUL LINK</a>
<div class="dropdown-content">
	<?php
		$helpfullinks = get_field( 'helpful_links' );
		if ( $helpfullinks ) {
			foreach ( $helpfullinks['body'] as $helpfullink ) {
				echo '<a href="';
				echo $helpfullink[1]['c'];
				echo '">';
				echo $helpfullink[0]['c'];
				echo '</a>';
	    }
		}
	?>
</div>
</li>

<li><a href="">SIGN IN</a></li>
</ul></div></div>
	</div>
</div>
</div>


<!-- Introduction -->
<div class="container-fluid main-body">
	<div class="content-intro">
		<h1 style="color:<?php the_field(intro_title_color); ?>"><?php the_field(intro_title); ?></h1>
		<p>
			<?php the_field(intro_description); ?>

		</p>
	</div>
</div>

<!--Navigation-->
<div class="container-fluid main-body">
	<div class="col-xs-12 col-md-4 col" style="">
		<a href="http://www.pihcsnohomish.org/about/staff/">
			<img src="<?php the_field(live_healthy_navigation_image); ?>" alt="Leadership &amp; Staff">
			<h3 class="title" style="color:<?php the_field(navigation_title_color); ?>"><?php the_field(live_healthy_navigation_title); ?></h5>
		</a>
		<div class="excerpt">
			<p><?php the_field(live_healthy_navigation_description); ?></p>
		</div>
		<a href="http://www.pihcsnohomish.org/about/staff/" class="btn btn-blue">EXPLORER COMMUNITY</a>
	</div>

	<div class="col-xs-12 col-md-4 col" style="">
		<a href="http://www.pihcsnohomish.org/about/staff/">
			<img src="<?php the_field(live_well_navigation_image); ?>" alt="Leadership &amp; Staff">
			<h3 class="title" style="color:<?php the_field(navigation_title_color); ?>"><?php the_field(live_well_navigation_title); ?></h5>
		</a>
		<div class="excerpt">
			<p><?php the_field(live_well_navigation_description); ?></p>
		</div>
		<a href="http://www.pihcsnohomish.org/about/staff/" class="btn btn-blue">LOCAL RESOURCE</a>
	</div>

	<div class="col-xs-12 col-md-4 col" style="">
		<a href="http://www.pihcsnohomish.org/about/staff/">
			<img src="<?php the_field(provider_portal_navigation_image); ?>" alt="Leadership &amp; Staff">
			<h3 class="title" style="color:<?php the_field(navigation_title_color); ?>"><?php the_field(provider_portal_navigation_title); ?></h5>
		</a>
		<div class="excerpt">
			<p><?php the_field(provider_portal_navigation_description); ?></p>
		</div>
		<a href="http://www.pihcsnohomish.org/about/staff/" class="btn btn-blue">CONNECT TO PORTAL</a>
	</div>

</div>


<!--Lower Body-->
<div class="lower-body">
<div class="container-fluid main-body">
	<div id="join-us">
		<div class="container-fluid">
			<div class="col-md-8">
				<section id="text-3" class="widget widget_text">
					<div class="textwidget">
						<a href="<?php the_field(lower_benner_1_url); ?>" target="_blank"><img src="<?php the_field(lower_benner_1_image); ?>" alt="Edge of Amazing" class="img-responsive">
						</a>
					</div>
				</section>
				<section id="text-3" class="widget widget_text">
					<div class="textwidget">
						<a href="<?php the_field(lower_benner_2_url); ?>" target="_blank"><img src="<?php the_field(lower_benner_2_image); ?>" alt="Edge of Amazing" class="img-responsive">
						</a>
					</div>
				</section>
			</div>
				<div class="col-md-4">
					<div style="margin-top:30px;">

						<div class="fb-page" data-href="<?php the_field(facebook_link); ?>" data-tabs="timeline" data-height="475" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="<?php the_field(facebook_link); ?>" class="fb-xfbml-parse-ignore"><a href="<?php the_field(facebook_link); ?>">Facebook</a></blockquote></div>
				</div>

				</div>
				</div>
			</div>
</div>
</div>




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
							<li> <a href="">LIVEHEALTHY 2020</a></li>
							<li> <a href="">LIVEWILL LOCAL</a></li>
							<li> <a href="">PARTNER PORTAL</a></li>
							<li> <a href="">PRIVACY POLICY</a></li>
							<li> <a href="">ACCESSIBILITY POLICY</a></li>
							<li> <a href="">CONTACT US</a></li>
						</ul>
						<ul style="margin-bottom: 0;">
							<li> <a href="">PIHC SNOHOMISH</a></li>
							<li> <a href="">WASHINGTON.PROVIDENCE.ORG</a></li>
						</ul>
					</div></p>

				</div>
			</div>
		</div>
	</footer><!-- #colophon -->


<?php get_footer(); ?>
