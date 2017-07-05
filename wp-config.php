<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost:8889');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'R4F$YzO(Ak5hs6~3VK=Y_E7@9.;.,/qT,aW@u]Nfd!+xU!1m9et!AL-nJvFL%7!%');
define('SECURE_AUTH_KEY',  'Mg11=]O/HS:_|6hKjC6aT!O14C+L*;|p}-^uoLbeX&c{Q}qxz:3l2?TbUF<5R8Oq');
define('LOGGED_IN_KEY',    '{R0pLh@q`_O` TCz4W;zFZtSkz(OsPOFWzjq9U3,oV@~fOTa~F^2s@GiP|&,AsYj');
define('NONCE_KEY',        'Xw(S{X1|y2HkRNwhZuG-RH*c43J6e5jiAP4x9??ioR):E;RaAvmE>]huQY:HF9%[');
define('AUTH_SALT',        '~%(|u[[CR&xyw.`AHI~P|oGMJ%u{[=&(/&S<& PQ?V=.Ztv#,cvRhAXQDsk<|yVN');
define('SECURE_AUTH_SALT', 'z^<@)1_^2Lt:(%7_!;Q .c`n3DBrtz;RAhi;/2dFTepgOAw6;S3wQ_04apbGql(3');
define('LOGGED_IN_SALT',   'd!_x8Wq.,/.Z_3u+X8%-*~V:59@KiKZIF.9,m!E<TgJnH=N@`j4`4tW0FV(5m]pm');
define('NONCE_SALT',       'gd}>;4#6>|/3G-8$$2=`dy+&bV8?&-S17&IF](It P.C5Zebok/Xh7yQk>d&:MH4');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
