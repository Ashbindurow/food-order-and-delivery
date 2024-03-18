import { motion } from "framer-motion";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./carousalSwipes.css";

const CarousalSlider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <motion.div className="CarousalSlider">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide">
          <motion.img
            className="image_slider_image"
            src="wallpaperflare.com_wallpaper (12).jpg"
            alt=""
            animate={{ y: "50%", translateY: "-50%" }}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <motion.img
            className="image_slider_image"
            src="wallpaperflare.com_wallpaper (13).jpg"
            alt=""
            animate={{ y: "50%", translateY: "-50%" }}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <motion.img
            className="image_slider_image"
            src="wallpaperflare.com_wallpaper (14).jpg"
            alt=""
            animate={{ y: "50%", translateY: "-50%" }}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <motion.img
            className="image_slider_image"
            src="wallpaperflare.com_wallpaper (15).jpg"
            alt=""
            animate={{ y: "50%", translateY: "-50%" }}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <motion.img
            className="image_slider_image"
            src="wallpaperflare.com_wallpaper (16).jpg"
            alt=""
            animate={{ y: "50%", translateY: "-50%" }}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <motion.img
            className="image_slider_image"
            src="wallpaperflare.com_wallpaper (17).jpg"
            alt=""
            animate={{ y: "50%", translateY: "-50%" }}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <motion.img
            className="image_slider_image"
            src="wallpaperflare.com_wallpaper (18).jpg"
            alt=""
            animate={{ y: "50%", translateY: "-50%" }}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <motion.img
            className="image_slider_image"
            src="wallpaperflare.com_wallpaper (19).jpg"
            alt=""
            animate={{ y: "50%", translateY: "-50%" }}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <motion.img
            className="image_slider_image"
            src="wallpaperflare.com_wallpaper (20).jpg"
            alt=""
            animate={{ y: "50%", translateY: "-50%" }}
          />
        </SwiperSlide>
      </Swiper>
    </motion.div>
  );
};

export default CarousalSlider;
