'use client'
import { useEffect, useState } from "react";
import {
  Heading,
  Text,
  ImageIcon,
  Quote,
  Video,
  Code,
  Layout,
  Trash2,
  Bold,
  Italic,
  Underline,
  FileCode2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";

const ElementorPage = () => {
    const [blocks, setBlocks] = useState([]);

    const dispatch = useDispatch()

    // get id from search param
    const searchParams = useSearchParams()
    const postId = searchParams.get('post_id')

    const { data: posts, postLoading } = useSelector((state) => state.post)
    const currentPost = posts?.find((post) => post._id === postId)

    useEffect(() => {
        if (currentPost?.content) {
            setBlocks(currentPost?.content)
        }
    }, [currentPost])

    const [notification, setNotification] = useState(null)

    const addBlock = (type) => {
        const newBlock = { id: Date.now(), type, content: "" };
        if (type === "image") newBlock.ratio = "auto"; // default ratio
        if (type === "columns") newBlock.content = { left: "", right: "" };
        setBlocks([...blocks, newBlock]);
    };

    const updateBlock = (id, content) => {
        setBlocks(blocks.map((block) => (block.id === id ? { ...block, ...content } : block)));
    };

    const updateImageBlock = (id, updates) => {
        setBlocks(blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)));
    };

    const removeBlock = (id) => {
        setBlocks(blocks.filter((block) => block.id !== id));
    };

    // --- TEXT FORMATTING HELPERS ---
    const formatText = (block, style) => {
        const textarea = document.getElementById(`editor-${block.id}`);
        if (!textarea) return;
        const { selectionStart, selectionEnd, value } = textarea;
        const selected = value.substring(selectionStart, selectionEnd);

        let wrapped = selected;
        if (style === "bold") wrapped = `<b>${selected}</b>`;
        if (style === "italic") wrapped = `<i>${selected}</i>`;
        if (style === "underline") wrapped = `<u>${selected}</u>`;

        const newValue =
        value.substring(0, selectionStart) +
        wrapped +
        value.substring(selectionEnd);

        updateBlock(block.id, { content: newValue } );
        
    };

    const formatColumns = (block, style, side) => {
        const textarea = document.getElementById(`editor-${block.id}-${side}`);
        
        if (!textarea) return;
        const { selectionStart, selectionEnd, value } = textarea;
        const selected = value.substring(selectionStart, selectionEnd);
        
        let wrapped = selected;
        if (style === "bold") wrapped = `<b>${selected}</b>`;
        if (style === "italic") wrapped = `<i>${selected}</i>`;
        if (style === "underline") wrapped = `<u>${selected}</u>`;
        
        const newValue = value.substring(0, selectionStart) + wrapped + value.substring(selectionEnd);

        const number = Number(block.id)
        updateBlock(number, { content: { ...block.content, [side]: newValue } } );
        
    }

    const normalizeVideoUrl = (url) => {
        try {
          const parsed = new URL(url);
      
          // Handle YouTube watch links
          if (parsed.hostname.includes("youtube.com") && parsed.searchParams.get("v")) {
            const videoId = parsed.searchParams.get("v");
            return `https://www.youtube.com/embed/${videoId}`;
          }
      
          // Handle short youtu.be links
          if (parsed.hostname === "youtu.be") {
            const videoId = parsed.pathname.split("/")[1]; // grabs ftYmXoH0V5I
            return `https://www.youtube.com/embed/${videoId}`;
          }
      
          // Handle Vimeo
          if (parsed.hostname.includes("vimeo.com")) {
            const videoId = parsed.pathname.split("/")[1];
            return `https://player.vimeo.com/video/${videoId}`;
          }
      
          // Already embed
          return url;
        } catch (err) {
          return url;
        }
    };      

    // --- EDITOR BLOCKS ---
    const renderEditorBlock = (block) => {
        switch (block.type) {
        case "heading":
            return (
            <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                placeholder="Heading text..."
                className="w-full p-2 border rounded font-bold text-lg"
            />
            );
        case "text":
            return (
            <div>
                {/* Toolbar */}
                <div className="flex gap-2 mb-2">
                <button
                    onClick={() => formatText(block, "bold")}
                    className="p-1 border rounded hover:bg-gray-100"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    onClick={() => formatText(block, "italic")}
                    className="p-1 border rounded hover:bg-gray-100"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    onClick={() => formatText(block, "underline")}
                    className="p-1 border rounded hover:bg-gray-100"
                >
                    <Underline className="w-4 h-4" />
                </button>
                </div>
                <textarea
                    id={`editor-${block.id}`}
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                    placeholder="Start typing your paragraph..."
                    className="w-full p-2 border rounded text-sm"
                />
            </div>
            );
        case "image":
            return (
            <div>
                {/* Upload */}
                <div className="flex gap-2 mb-2">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        updateImageBlock(block.id, {
                        file,
                        content: URL.createObjectURL(file),
                        url: "", // reset URL if uploading
                        });
                    }
                    }}
                    className="text-sm text-gray-600"
                />
                </div>
        
                {/* URL input */}
                <input
                type="text"
                value={block.url || ""}
                onChange={(e) =>
                    updateImageBlock(block.id, {
                    url: e.target.value,
                    content: e.target.value, // preview directly from URL
                    file: null, // reset file if pasting URL
                    })
                }
                placeholder="Or paste image URL..."
                className="w-full p-2 border rounded text-sm mb-2"
                />
        
                {/* Aspect ratio */}
                <select
                    value={block.ratio}
                    onChange={(e) => updateImageBlock(block.id, { ratio: e.target.value })}
                    className="p-2 border rounded mb-2 text-sm"
                >
                <option value="auto">Auto</option>
                <option value="16/9">16:9</option>
                <option value="4/3">4:3</option>
                <option value="1/1">1:1</option>
                </select>
        
                {/* Preview */}
                {block.content && (
                <div
                    className={`w-full overflow-hidden rounded ${
                    block.ratio !== "auto" ? `aspect-[${block.ratio}]` : ""
                    }`}
                >
                    <img
                    src={block.content}
                    alt="preview"
                    className="w-full h-full object-cover"
                    />
                </div>
                )}
            </div>
            );      
        case "quote":
            return (
            <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value } )}
                placeholder="Quote text..."
                className="w-full p-2 border-l-4 border-[#0EA5A4] bg-gray-50 rounded text-sm italic"
            />
            );
        case "video":
            return (
                <div>
                    <label htmlFor="">For YouTube & Vimeo Links Only</label>
                    {/* Video Input */}
                    <input
                        type="text"
                        placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                        value={block.content || ""}
                        onChange={(e) =>
                            updateBlock(block.id, { content: normalizeVideoUrl(e.target.value) })
                        }
                        className="w-full mb-2 p-2 border rounded text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                    />
            
                    {/* Preview */}
                    <div className="aspect-w-16 aspect-h-9 border rounded flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    {block.content ? (
                        <>
                            <iframe
                            src={block.content}
                            className="w-full h-64 rounded"
                            allowFullScreen
                            ></iframe>
                            {/* {block.content} */}
                        </>
                    ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                            Add a video URL to preview
                        </span>
                    )}
                    </div>
                </div>
            )
        case "code":
            return (
            <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                placeholder="Write code snippet..."
                className="w-full p-2 font-mono border rounded text-xs bg-gray-900 text-green-400"
            />
            );
        case "columns":
            return (
            <div className="grid grid-cols-2 gap-4">
                {["left", "right"].map((side) => (
                    <div key={side}>
                        <div className="flex gap-2 mb-2">
                        <button
                            onClick={() =>
                                formatColumns({ ...block, id: `${block.id}` }, "bold", `${side}`)
                            }
                            className="p-1 border rounded hover:bg-gray-100"
                        >
                            <Bold className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() =>
                                formatColumns({ ...block, id: `${block.id}` }, "italic", `${side}`)
                            }
                            className="p-1 border rounded hover:bg-gray-100"
                        >
                            <Italic className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() =>
                            formatColumns({ ...block, id: `${block.id}` }, "underline", `${side}`)
                            }
                            className="p-1 border rounded hover:bg-gray-100"
                        >
                            <Underline className="w-4 h-4" />
                        </button>
                        </div>
                        <textarea
                            id={`editor-${block.id}-${side}`}
                            value={block.content?.[side] || ""}
                            onChange={(e) => {
                                updateBlock(block.id, { content: { ...block.content, [side]: e.target.value } })
                                // console.log("block in form", block);
                                
                            }}
                            placeholder={`${side} column...`}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                ))}
            </div>
            );
        case "ads":
            return (
            <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value } )}
                placeholder="Paste Google Ads code snippet here..."
                className="w-full p-2 border rounded text-xs bg-gray-50 font-mono"
            />
            );
        default:
            return null;
        }
    };

    // --- PREVIEW BLOCKS ---
    const renderPreviewBlock = (block) => {
        switch (block.type) {
        case "heading":
            return <h2 className="text-2xl font-bold">{block.content}</h2>;
        case "text":
            return <p dangerouslySetInnerHTML={{ __html: block.content }} />;
        case "image":
            return (
            block.content && (
                <div
                className={`my-4 rounded overflow-hidden ${
                    block.ratio !== "auto" ? `aspect-[${block.ratio}]` : ""
                }`}
                >
                <img
                    src={block.content}
                    alt="preview"
                    className="w-full h-full object-cover"
                />
                </div>
            )
            );
        case "quote":
            return (
            <blockquote className="border-l-4 pl-4 italic text-gray-600">
                {block.content}
            </blockquote>
            );
        case "video":
            return (
                <div className="aspect-w-16 aspect-h-9 border rounded flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    {block.content ? (
                        <>
                            <iframe
                            src={block.content}
                            className="w-full h-64 rounded"
                            allowFullScreen
                            ></iframe>
                            {/* {block.content} */}
                        </>
                    ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                            Add a video URL to preview
                        </span>
                    )}
                </div>
            );
        case "code":
            return (
            <pre className="bg-gray-900 text-green-400 text-xs p-3 rounded overflow-x-auto">
                <code>{block.content}</code>
            </pre>
            );
        case "columns":
            return (
            <div className="grid grid-cols-2 gap-6">
                <div dangerouslySetInnerHTML={{ __html: block.content?.left }} />
                <div dangerouslySetInnerHTML={{ __html: block.content?.right }} />
            </div>
            );
        case "ads":
            return (
            <div dangerouslySetInnerHTML={{ __html: block.content }} />
            );
        default:
            return null;
        }
    };

    const [loading, setLoading] = useState(false)

    //   Handle Submit
    const handleSubmit = async () => {
        setLoading(true);
      
        try {
          // Create form data
          const formData = new FormData();
      
          // Separate blocks into JSON + images
          const processedBlocks = await Promise.all(
            blocks.map(async (block) => {
              if (block.type === "image" && block.file) {
                // Generate unique key for image
                const key = `image-${block.id}`;
                formData.append(key, block.file);
      
                // Replace file reference with a placeholder key
                return {
                  ...block,
                  file: undefined,
                  content: key, // placeholder for server to replace with URL
                };
              }
              return block;
            })
          );
      
          // Append blocks JSON
          formData.append("blocks", JSON.stringify(processedBlocks));

        //   console.log(blocks);
          
      
        //   Send to API (PATCH for updating a post)
          const res = await fetch(`/api/protected/posts/content/${postId}`, {
            method: "PATCH",
            body: formData,
          });
      
          if (!res.ok) {
            // throw new Error(`Failed: ${res.status}`);
            setNotification({
                type: 'error',
                message: `Failed: ${res.status}`
            })
          }
      
          const data = await res.json();
      
          setLoading(false);
          setNotification({
            type: 'success',
            message: 'Post content created successfully'
          })

          setTimeout(() => {
            window.location.href = "/dashboard/posts"
          }, 2000)
        } catch (err) {
          console.error("Save failed", err);
          setLoading(false);
          setNotification({
            type: 'error',
            message: 'Something went wrong, please try again later'
          })
        }
    };
      
    return (
        <div className="flex min-h-screen bg-gray-50 relative">
            {notification && (
                <Notification
                    type={notification.type && notification.type}
                    message={notification.message && notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4 border-r">
                <h3 className="font-bold mb-4">Blocks</h3>
                <div className="space-y-2">
                    <button
                        onClick={() => addBlock("heading")}
                        className="flex items-center gap-2 w-full p-2 border rounded hover:bg-gray-100"
                    >
                        <Heading className="w-4 h-4" /> Heading
                    </button>
                    <button
                        onClick={() => addBlock("text")}
                        className="flex items-center gap-2 w-full p-2 border rounded hover:bg-gray-100"
                    >
                        <Text className="w-4 h-4" /> Text
                    </button>
                    <button
                        onClick={() => addBlock("image")}
                        className="flex items-center gap-2 w-full p-2 border rounded hover:bg-gray-100"
                    >
                        <ImageIcon className="w-4 h-4" /> Image
                    </button>
                    <button
                        onClick={() => addBlock("quote")}
                        className="flex items-center gap-2 w-full p-2 border rounded hover:bg-gray-100"
                    >
                        <Quote className="w-4 h-4" /> Quote
                    </button>
                    <button
                        onClick={() => addBlock("video")}
                        className="flex items-center gap-2 w-full p-2 border rounded hover:bg-gray-100"
                    >
                        <Video className="w-4 h-4" /> Video
                    </button>
                    <button
                        onClick={() => addBlock("code")}
                        className="flex items-center gap-2 w-full p-2 border rounded hover:bg-gray-100"
                    >
                        <Code className="w-4 h-4" /> Code
                    </button>
                    <button
                        onClick={() => addBlock("columns")}
                        className="flex items-center gap-2 w-full p-2 border rounded hover:bg-gray-100"
                    >
                        <Layout className="w-4 h-4" /> Two Columns
                    </button>
                    <button
                        onClick={() => addBlock("ads")}
                        className="flex items-center gap-2 w-full p-2 border rounded hover:bg-gray-100"
                    >
                        <FileCode2 className="w-4 h-4" /> Google Ads
                    </button>
                </div>
            </aside>

            {/* Editor + Preview */}
            <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 pb-[300px]">
                {/* Editor */}
                <div>
                    <h3 className="font-bold mb-4">Editor</h3>
                    <div className="space-y-6">
                        {blocks.map((block) => (
                            <div
                                key={block.id}
                                className="bg-white p-4 rounded shadow relative"
                            >
                                <button
                                onClick={() => removeBlock(block.id)}
                                className="absolute top-2 right-2 text-red-500 z-10 cursor-pointer"
                                >
                                <Trash2 className="w-4 h-4" />
                                </button>
                                {renderEditorBlock(block)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preview */}
                <div>
                    <h3 className="font-bold mb-4">Preview</h3>
                    <div className="space-y-6 bg-white p-4 rounded shadow">
                        {blocks.map((block) => (
                            <div key={block.id}>{renderPreviewBlock(block)}</div>
                        ))}
                    </div>
                </div>
            </main>

            <div className="flex items-center justify-between bg-white fixed bottom-0 py-1 pe-5 left-0 right-0">
                <h3 className="text-2xl font-bold ms-2">{ !postLoading ? `Build Content for "${ currentPost?.title }" post` : 'Loading...' }</h3>
                <button className="bg-blue-500 px-7 py-3 rounded text-white cursor-pointer" onClick={handleSubmit}>
                    {loading ? "Publishing..." : "Publish"}
                </button>
            </div>
        </div>
    );
};

export default ElementorPage;