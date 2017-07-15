<?php /* Template Name: PIHChome */ ?>
<div id="widgetized-header">

	<?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('header')) : else : ?>

	<div class="pre-widget">
		<p><strong>Widgetized Header</strong></p>
		<p>This panel is active and ready for you to add some widgets via the WP Admin</p>
	</div>

	<?php endif; ?>

</div>
<div id="widgetized-area">

	<?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('widgetized-area')) : else : ?>

	<div class="pre-widget">
		<p><strong>Widgetized Area</strong></p>
		<p>This panel is active and ready for you to add some widgets via the WP Admin</p>
	</div>

	<?php endif; ?>

</div>
<div id="widgetized-footer">

	<?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('footer')) : else : ?>

	<div class="pre-widget">
		<p><strong>Widgetized Footer</strong></p>
		<p>This panel is active and ready for you to add some widgets via the WP Admin</p>
	</div>

	<?php endif; ?>

</div>
