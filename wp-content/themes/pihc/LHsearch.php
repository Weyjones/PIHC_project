<?php /* Template Name: Live Healthy 2020 search */ ?>

<?php get_header(); ?>
<link rel='stylesheet' href='<?php echo (get_template_directory_uri().'/css/treeview-style.css') ?>' type='text/css' />

<header id="header">
	<div class="container-fluid">

		<div class="col-sm-12 col-md-8 site-branding">
			<a href="http://www.pihcsnohomish.org/"><img src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/logo.png" alt="" class="logo"></a>
		</div>

		<div class="col-sm-12 col-md-4 site-details">
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



<!--Menu-->
<div class="sub-menu" style="background:<?php the_field(menu_color); ?>">
<div class="container-fluid">
	<div class="row">

<div class="col-sm-12 col-md-2">
<div class="diamond" style="background:<?php the_field(menu_color); ?>">
	<div class="diamond-inner">
		<a href="http://www.pihcsnohomish.org/livewell/">
			<img src="<?php the_field(menu_icon); ?>" alt="">
			<span style="line-height: 90%;">LIVE HEALTHY</span>
		</a>
	</div>
</div>
</div>
<div class="col-sm-12 col-md-10">
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

<!--Search Bar-->
<div class="container-fluid main-body">
	<form id="lh-search-form" class="search-bar" action="/livehealthy2020/search/">
		<div class="keyword-search col-md-5">
			<input type="text" name="query" class="form-control" placeholder="Search by Keyword">
		</div>
		<div class="address-search col-md-5">
			<input type="text" name="location" class="form-control" placeholder="Enter your Location (City or Zip Code) ">
		</div>
		<button type="submit" class="btn-search"><img src="<?php the_field(search_button_icon); ?>"></button>
	</form>
</div>
<script>
$("#lh-search-form").submit(function( event ) {
  var params = $(this).serializeArray();
  var keypairs = [];
  var searchStr = '?';
  for(var i in params) {
    var p = params[i];
    var name = p.name;
    var value = encodeURIComponent(p.value);
    if (value) {
        keypairs.push(name + '=' + value);
    }
  }
  searchStr += keypairs.join('&');

  var url = window.location.origin + window.location.pathname + '#/' + searchStr;

  window.location.href = url;
  event.preventDefault();
});
</script>

<!--Search Result-->
<?php if ( dynamic_sidebar('liveHealthy-search') ) : else : endif; ?>

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
