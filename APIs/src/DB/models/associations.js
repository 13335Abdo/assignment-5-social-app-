
import {posts} from "./Posts.js";
import {comments} from "./Comments.js";
import {User} from "./Users.js";

posts.hasMany(comments, { foreignKey: "postId" });
comments.belongsTo(posts, { foreignKey: "postId" });

User.hasMany(posts, { foreignKey: "userId" });
posts.belongsTo(User, { foreignKey: "userId" });

User.hasMany(comments, { foreignKey: "userId" });
comments.belongsTo(User, { foreignKey: "userId" });

