const Axios = require("axios");

const commitMessages = async () => {
  try {
    const item = await Axios.get(
      "https://api.github.com/repos/challaBhagyalakshmi/Todoapp/commits",
      {
        per_page: 5,
      }
    );
    console.log(item.data);
    console.log(
      "---------------------------------------------------------------------------------------------------------------------------------------"
    );
    console.log(
      "| TIMESTAMP                                         SHA                                                  MESSAGE                       |"
    );
    console.log(
      "---------------------------------------------------------------------------------------------------------------------------------------"
    );
    let maxCommitMessageLength = 0;
    const data = item.data.filter((item, index) => {
      let result;
      if (index < 5) {
        result = item;
        if (maxCommitMessageLength < item.commit.message.length) {
          maxCommitMessageLength = item.commit.message.length;
        }
      }
      return result;
    });

    let commitInfo = "";
    data.map((item, index) => {
      commitInfo =
        "|" +
        item.commit.author.date +
        "                 " +
        item.sha +
        "             " +
        item.commit.message;
      for (
        let j = 0;
        j < maxCommitMessageLength - item.commit.message.length;
        j++
      ) {
        commitInfo = commitInfo + " ";
      }
      commitInfo = commitInfo + "      |";
      console.log(commitInfo);
      console.log(
        "----------------------------------------------------------------------------------------------------------------------------------------"
      );
    });
  } catch (error) {
    console.log(error);
  }
};

commitMessages();
