<?php /* Template Name: LWLhome */
wp_head(); ?>

<div class="pihc-template">
	<?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('pihc-header')) : else : ?>

	<div class="pre-widget">
		<p><strong>PIHC Header</strong></p>
	</div>

	<?php endif; ?>


	<?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('liveWell-content')) : else : ?>

	<div class="pre-widget">
		<p><strong>PIHC Content</strong></p>
	</div>

	<?php endif; ?>


	<?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('pihc-footer')) : else : ?>

	<div class="pre-widget">
		<p><strong>PIHC Footer</strong></p>
	</div>

	<?php endif; ?>

</div>
	<?php wp_footer(); ?>
