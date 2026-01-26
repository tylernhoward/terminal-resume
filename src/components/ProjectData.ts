export interface ProjectData {
    description: string;
    image: string;
    githubUrl: string;
    exploreUrl: string;
}

export type ViewLocation =
    | { type: 'root' }
    | { type: 'project'; projectName: string }

export type FileType = 'text' | 'image' | 'link-github' | 'link-explore'

export interface FileItem {
    name: string
    type: FileType
    content: string
}
