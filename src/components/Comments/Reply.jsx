/* eslint-disable react/prop-types */
const Reply = ({
  reply,
  handleReplyClick,
  editingCommentIndex,
  replyText,
  handleReplyTextChange,
  postReply,
  setReplyText,
}) => {
  return (
    <>
      <div key={reply?.id} className="h-auto w-auto flex items-center p-3">
        <div className="reply-img-div ml-2">
          <img
            className="rounded-full"
            src={reply?.snippet?.authorProfileImageUrl}
            alt={reply?.snippet?.authorProfileDisplayName}
          />
        </div>
        <div className="reply-author-name-div flex flex-col ml-3">
          <p className="reply-author-name text-sm opacity-65">
            {reply?.snippet?.authorDisplayName}
          </p>
          <p className="text-sm">{reply?.snippet?.textDisplay}</p>

          <button
            onClick={() => handleReplyClick(reply?.id)}
            className="text-bold text-left mt-1"
          >
            REPLY
          </button>

          {editingCommentIndex === reply?.id && (
            <div className="flex flex-col" key={reply?.id}>
              <input
                placeholder="type a reply"
                className="border h-16 w-64 text-sm"
                type="text"
                value={replyText}
                onChange={handleReplyTextChange}
              />
              <div className="flex">
                <button
                  onClick={() => handleReplyClick(reply?.id)}
                  className="ml-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    postReply(reply?.snippet?.parentId);
                    setReplyText("");
                  }}
                  className="ml-4"
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reply;
