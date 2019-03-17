<?php
require_once('dbconnect.php');
$Dbobj = new DbConnection(); 
$conn = $Dbobj->getdbconnect();

$server_uri = $_SERVER['REQUEST_URI'];
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$html = file_get_contents('./react-index.html');
if(preg_match('/(?:\/|\/home)$/', $_SERVER["REQUEST_URI"])){
    // home page
    $seo_tag = ["__OG_TYPE__", "__OG_SITE_NAME__", "__OG_IMAGE__", "__OG_TITLE__", "__OG_DESCRIPTION__", "__OG_URL__", "__OG_IMAGE_TYPE__", "__OG_IMAGE_WIDTH__", "__OG_IMAGE_HEIGHT__"];
    $seo_content = [
        "article",
        "prisdac",
        "https://lh3.googleusercontent.com/Fn7DaV9jW-MiSn_WZl_j5_WuZl2_6Y6wJKYW7PfNMS4kUs35UWnw1RuE_cdRJAcfdrOpECZxwIMvTGNo3Jy-UG_M-OBK4FTNUKqiXX4CybenkyKDSGNSLiDbBiHJK_iJDtbTf31XNQ=w650",
        "Prisma SDA Church Jakarta",
        "Home -- Prisma SDA Church Jakarta",
        "https://www.prisdac.org",
        "image/jpeg",
        "650",
        "366"
    ];
    $html = str_replace($seo_tag,$seo_content,$html);
}
elseif(preg_match('/(?:\/gallery-album)$/', $_SERVER["REQUEST_URI"])){
    // home page
    $seo_tag = ["__OG_TYPE__", "__OG_SITE_NAME__", "__OG_IMAGE__", "__OG_TITLE__", "__OG_DESCRIPTION__", "__OG_URL__", "__OG_IMAGE_TYPE__", "__OG_IMAGE_WIDTH__", "__OG_IMAGE_HEIGHT__"];
    $seo_content = [
        "article",
        "prisdac",
        "https://lh3.googleusercontent.com/Fn7DaV9jW-MiSn_WZl_j5_WuZl2_6Y6wJKYW7PfNMS4kUs35UWnw1RuE_cdRJAcfdrOpECZxwIMvTGNo3Jy-UG_M-OBK4FTNUKqiXX4CybenkyKDSGNSLiDbBiHJK_iJDtbTf31XNQ=w650",
        "Prisma SDA Church Jakarta",
        "Gallery Album - Prisma SDA Church Jakarta",
        "https://www.prisdac.org",
        "image/jpeg",
        "650",
        "366"
    ];
    $html = str_replace($seo_tag,$seo_content,$html);
}
elseif(preg_match('/(?:\/gallery\/\d{1,})$/', $_SERVER["REQUEST_URI"])){
    $id = substr($server_uri, strrpos($server_uri, '/') + 1);
    $sql = "SELECT album_title, data_src, album_desc FROM tb_album WHERE _id = $id ";
    $result = $conn->query($sql);
    $row = [];
    if ($result->num_rows > 0) {
        // output data of each row
        // while($row = $result->fetch_assoc()) {
        //     echo "Title: " . $row["album_title"]. " " . $row["data_src"]. "<br>";
        // }
        $row = $result->fetch_assoc();

    } else {
        // echo "0 results";
    }
    // home page
    $seo_tag = ["__OG_TYPE__", "__OG_SITE_NAME__", "__OG_IMAGE__", "__OG_TITLE__", "__OG_DESCRIPTION__", "__OG_URL__", "__OG_IMAGE_TYPE__", "__OG_IMAGE_WIDTH__", "__OG_IMAGE_HEIGHT__"];
    $seo_content = [
        "article",
        "prisdac",
        $row["data_src"],
        "Gallery - Prisma SDA Church Jakarta",
        $row["album_title"]." - ".$row["album_desc"]." - Prisma SDA Church Jakarta",
        "https://www.prisdac.org",
        "image/jpeg",
        "650",
        "366"
    ];
    $html = str_replace($seo_tag,$seo_content,$html);
} else {
    $seo_tag = ["__OG_TYPE__", "__OG_SITE_NAME__", "__OG_IMAGE__", "__OG_TITLE__", "__OG_DESCRIPTION__", "__OG_URL__", "__OG_IMAGE_TYPE__", "__OG_IMAGE_WIDTH__", "__OG_IMAGE_HEIGHT__"];
    $seo_content = [
        "article",
        "prisdac",
        "https://lh3.googleusercontent.com/Fn7DaV9jW-MiSn_WZl_j5_WuZl2_6Y6wJKYW7PfNMS4kUs35UWnw1RuE_cdRJAcfdrOpECZxwIMvTGNo3Jy-UG_M-OBK4FTNUKqiXX4CybenkyKDSGNSLiDbBiHJK_iJDtbTf31XNQ=w650",
        "Prisma SDA Church Jakarta",
        "Home - Prisma SDA Church Jakarta",
        "https://www.prisdac.org",
        "image/jpeg",
        "650",
        "366"
    ];
    $html = str_replace($seo_tag,$seo_content,$html);
}

echo "<script>console.log('".$server_uri."');</script>";
echo $html;

$conn->close();
// if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"])) {
//     return false;    // serve the requested resource as-is.
// } else { 
//     echo "<p>Welcome to PHP</p>";
// }
// if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"])) {
// }
?>