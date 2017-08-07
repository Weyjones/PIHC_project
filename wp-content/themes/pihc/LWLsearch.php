<?php /* Template Name: LiveWell Local search */ ?>

<?php get_header(); ?>
<script src="<?php echo (get_template_directory_uri().'/js/pdfmake.js') ?>"></script>
<script src="<?php echo (get_template_directory_uri().'/js/vfs_fonts.js') ?>"></script>

<link rel='stylesheet' href='<?php echo (get_template_directory_uri().'/css/LWLtreeview-style.css') ?>' type='text/css' />
<link rel='stylesheet' href='<?php echo (get_template_directory_uri().'/css/search-app.css') ?>' type='text/css' />
<link rel='stylesheet' href='<?php echo (get_template_directory_uri().'/css/fav_icon.css') ?>' type='text/css' />

<header id="header">
	<div class="container-fluid">

		<div class="col-sm-12 col-md-8 site-branding">
			<a href=""><img style="padding-left: 40px;" src="http://www.pihcsnohomish.org/wp-content/uploads/2016/06/logo.png" alt="" class="logo"></a>
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

<div class="col-sm-12 col-md-1">
</div>
<div class="col-sm-12 col-md-2">
<div class="diamond" style="background:<?php the_field(menu_color); ?>">
	<div class="diamond-inner">
			<img src="<?php the_field(menu_icon); ?>" alt="">
			<span style="line-height: 90%;">LIVE WELL</span>
	</div>
</div>
</div>
<div class="col-sm-12 col-md-9">
<div id="breadcrumbs"><a rel="nofollow" href=""><?php the_field(menu_title); ?></a></div>	<div class="menu-livewell-submenu-container"><ul id="menu-livewell-submenu" class="menu">
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

<?php
if ( is_user_logged_in() ) {
global $current_user;
      echo '<li>';
      echo '<a href="/account/favorite/" title="My Account">My Account</a>';
      echo '</li>';
}
?>
<li>
<?php
if ( is_user_logged_in() ) {
		echo '<a href="'.wp_logout_url().'" title="Logout">Log out</a>';
	} else {
		echo '<a href="/login/" title="Login">Sign In</a>';
}
?>
</li>
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
	<form id="lwl-search-form" class="search-bar" action="/livewell/search/">
		<div class="keyword-search col-md-5">
			<input id="LWLautocomplete" type="text" name="query" class="form-control" placeholder="Search by Keyword">
		</div>
		<div class="address-search col-md-5">
			<input id="geocomplete" name="formatted_address" class="form-control"type="text" placeholder="Enter your Location (City or Zip Code)"/>
			<div hidden >
        Latitude:   <input name="lat" type="text" value="">
        Longitude:  <input name="lng" type="text" value="">
      </div>
		</div>
		<button type="submit" class="btn-search"><img src="<?php the_field(search_button_icon); ?>"></button>
	</form>
</div>
<script>
$("#lwl-search-form").submit(function( event ) {
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

<?php if ( dynamic_sidebar('livewell-search') ) : else : endif; ?>

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

	<script type='text/javascript' src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script type='text/javascript' src="<?php echo (get_template_directory_uri().'/js/jquery.geocomplete.min.js') ?>"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="<?php echo (get_template_directory_uri().'/js/autocomplete.js') ?>"></script>
	<script type='text/javascript'>
	$(function(){
		$("#geocomplete").geocomplete({
			details: "form"
		});
	});
	</script>

<script src="<?php echo (get_template_directory_uri().'/js/LWLsearchapp.js') ?>"></script>
<?php get_footer(); ?>
