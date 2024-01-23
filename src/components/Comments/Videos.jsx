/* eslint-disable react/prop-types */
const Videos = ({ matchedVideo }) => {
  return (
    <>
      <div className="videos flex w-96 border items-start">
        <div className="image-div">
          <img src={matchedVideo?.snippet?.thumbnails?.default?.url} alt="" />
        </div>
        <div className="title-div ml-3">
          <a
            href={`https://youtu.be/${matchedVideo?.contentDetails?.videoId}`}
            target="_blank"
            rel="noreferrer"
            className="title text-sm hover:underline"
          >
            {matchedVideo?.snippet?.title}
          </a>
        </div>
      </div>
    </>
  );
};

export default Videos;
