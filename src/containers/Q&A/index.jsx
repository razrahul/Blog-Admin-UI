import React from 'react'

export default function index() {

    const [faqNo, setFaqNo] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

    // Handle FAQ form submission
  const handleSubmitFAQ = (e) => {
    e.preventDefault();
    const faqData = {
      indexNo: faqNo,
      question,
      answer,
    };

    // console.log(faqNo, question, answer);
    console.log(faqData);
    dispatch(addFAQ(blogId, faqData));
    alert(`FAQ added at IndexNO: ${faqNo}`);

    // Reset FAQ form fields
    setFaqNo("");
    setQuestion("");
    setAnswer("");
  };
  return (
    <div>
      {/* FAQ Section */}
      <div className="add-faq">
        <h2>Add FAQ</h2>
        <form onSubmit={handleSubmitFAQ}>
          {/* Question No */}
          <div className="form-group">
            <label>Question No</label>
            <input
              type="number"
              value={faqNo}
              onChange={(e) => setFaqNo(e.target.value)}
              placeholder="Enter Question No"
              required
            />
            <small className="mandatory">*Question No must be unique.</small>
          </div>

          {/* Question */}
          <div className="form-group">
            <label>Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a Question"
              required
            />
          </div>

          {/* Answer */}
          <div className="form-group">
            <label>Answer</label>
            <ReactQuill
              value={answer}
              onChange={setAnswer}
              placeholder="Enter Answer"
              modules={modules}
              formats={formats}
              required
              />
          </div>

          <button type="submit" className="submit-button">
            Add Q&A
          </button>
        </form>
      </div>
    </div>
  )
}
