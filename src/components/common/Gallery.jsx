import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import defaultGalleryImages from "./galleryImages.js";

/**
 * Переиспользуемый компонент галереи изображений
 * 
 * @param {Array} images - Массив объектов изображений. Каждый объект должен содержать:
 *   - original: путь к оригинальному изображению
 *   - thumbnail: путь к миниатюре (опционально)
 *   - description: описание изображения (опционально)
 * @param {boolean} showBullets - Показывать ли кружочки пагинации (по умолчанию: true)
 * @param {boolean} infinite - Бесконечная прокрутка (по умолчанию: true)
 * @param {boolean} showThumbnails - Показывать ли миниатюры (по умолчанию: false)
 * @param {boolean} showFullscreenButton - Показывать ли кнопку полноэкранного режима (по умолчанию: true)
 * @param {boolean} showNav - Показывать ли стрелки навигации (по умолчанию: true)
 * @param {number} slideDuration - Длительность анимации перехода в мс (по умолчанию: 450)
 * @param {number} slideInterval - Интервал автопрокрутки в мс (по умолчанию: 3000)
 * @param {string} thumbnailPosition - Позиция миниатюр: "bottom", "top", "left", "right" (по умолчанию: "bottom")
 * @param {boolean} autoPlay - Автоматическая прокрутка (по умолчанию: true)
 */
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: false,
      showBullets: props.showBullets !== undefined ? props.showBullets : true,
      infinite: props.infinite !== undefined ? props.infinite : true,
      showThumbnails: props.showThumbnails !== undefined ? props.showThumbnails : false,
      showFullscreenButton: props.showFullscreenButton !== undefined ? props.showFullscreenButton : true,
      showGalleryFullscreenButton: true,
      showNav: props.showNav !== undefined ? props.showNav : true,
      slideVertically: false,
      isRTL: false,
      slideDuration: props.slideDuration || 450,
      slideInterval: props.slideInterval || 3000,
      slideOnThumbnailOver: false,
      thumbnailPosition: props.thumbnailPosition || "bottom",
      showVideo: false,
      useWindowKeyDown: true,
      autoPlay: props.autoPlay !== undefined ? props.autoPlay : true,
    };
    this._toggleShowVideo = this._toggleShowVideo.bind(this);

    // Используем изображения из props или дефолтные
    this.images = props.images || defaultGalleryImages;
  }

  _onImageClick(event) {
    console.debug(
      "clicked on image",
      event.target,
      "at index",
      this._imageGallery.getCurrentIndex()
    );
  }

  _onImageLoad(event) {
    console.debug("loaded image", event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug("slid to index", index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug("isFullScreen?", !!fullScreenElement);
  }

  _onMouseEnter() {
    if (this._imageGallery) {
      this._imageGallery.pause();
    }
  }

  _onMouseLeave() {
    if (this._imageGallery) {
      this._imageGallery.play();
    }
  }



  _resetVideo() {
    this.setState({ showVideo: false });

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true });
    }
  }

  _toggleShowVideo() {
    const { showVideo } = this.state;
    this.setState({
      showVideo: !showVideo,
    });

    if (!showVideo) {
      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false });
      }
    }
  }

  _renderVideo(item) {
    return (
      <div>
        {this.state.showVideo ? (
          <div className="video-wrapper">
            <button className="close-video" onClick={this._toggleShowVideo} />
            <iframe
              title="sample video"
              width="560"
              height="315"
              src={item.embedUrl}
              style={{ border: "none" }}
              allowFullScreen
            />
          </div>
        ) : (
          <>
            <button className="play-button" onClick={this._toggleShowVideo} />
            <img
              alt="sample video cover"
              className="image-gallery-image"
              src={item.original}
            />
            {item.description && (
              <span
                className="image-gallery-description"
                style={{ right: "0", left: "initial" }}
              >
                {item.description}
              </span>
            )}
          </>
        )}
      </div>
    );
  }

  render() {
    return (
      <section className="app">
        <div
          className="gallery-container"
          onMouseEnter={this._onMouseEnter.bind(this)}
          onMouseLeave={this._onMouseLeave.bind(this)}
        >
          <ImageGallery
            ref={(i) => (this._imageGallery = i)}
            items={this.images}
            onClick={this._onImageClick.bind(this)}
            onImageLoad={this._onImageLoad}
            onSlide={this._onSlide.bind(this)}
            onScreenChange={this._onScreenChange.bind(this)}
            infinite={this.state.infinite}
            showBullets={this.state.showBullets}
            showFullscreenButton={
              this.state.showFullscreenButton &&
              this.state.showGalleryFullscreenButton
            }
            showPlayButton={false}
            autoPlay={this.state.autoPlay}
            showThumbnails={this.state.showThumbnails}
            showIndex={this.state.showIndex}
            showNav={this.state.showNav}
            isRTL={this.state.isRTL}
            thumbnailPosition={this.state.thumbnailPosition}
            slideDuration={parseInt(this.state.slideDuration)}
            slideInterval={parseInt(this.state.slideInterval)}
            slideOnThumbnailOver={this.state.slideOnThumbnailOver}
            additionalClass="app-image-gallery"
            useWindowKeyDown={this.state.useWindowKeyDown}
            slideVertically={this.state.slideVertically}
          />
        </div>
      </section>
    );
  }
}

export default Gallery;