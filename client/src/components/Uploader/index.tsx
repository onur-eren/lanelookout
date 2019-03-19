import React from "react";
import Dropzone from "react-dropzone";

const maxSize = 1300;

// interface HTMLCanvasElement {
//   getContext(contextId: '2d'): CanvasRenderingContext2D;
// }

// interface CanvasRenderingContext2D {
//   drawImage: any
// }

type UploaderState = {
  image: {
    [key: string]: any
  }
}

class Uploader extends React.Component<{}, UploaderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      image: {}
    };
  }

  onDrop = (files: any) => {
    const image: any = files[0];
    console.log("image:", image);
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target!.result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        console.log("width:", width);
        console.log("height:", height);
        console.log("maxSize:", maxSize);
        if (width < maxSize && height < maxSize) {
          console.log("image already good:", image);
          this.setState({ image });
          return;
        }
        if (width > height) {
          height *= maxSize / width;
          width = maxSize;
        } else {
          width *= maxSize / height;
          height = maxSize;
        }
        console.log("width:", width);
        console.log("height:", height);
        elem.width = width;
        elem.height = height;
        const ctx: any = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob((blob: any) => {
          const newImage = new File(
            [blob],
            image.name,
            {
              type: 'image/jpeg',
              lastModified: Date.now()
            }
          );
          console.log("newImage:", newImage);
          this.setState({ image: newImage });
        }, 'image/jpeg');
      }
    }
  }

  render() {
    const { image } = this.state;
    return (
      <React.Fragment>
        <Dropzone
          onDrop={this.onDrop}
        >
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'dropzone--isActive' : ''}`}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop files here...</p> :
                    <p>Try dropping some files here, or click to select files to upload.</p>
                }
              </div>
            )
          }}
        </Dropzone>
        <p></p>
      </React.Fragment>
    );
  }
}

export default Uploader;