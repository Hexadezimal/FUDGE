namespace FudgeCore {
    
    /** This function type takes x and z as Parameters and returns a number - to be used as a heightmap. 
     * x and z are mapped from 0 to 1 when used to generate a Heightmap Mesh
     * @authors Simon Storl-Schulke, HFU, 2020*/
    export type heightMapFunction = (x: number, z: number) => number;
    
    /**
     * Generates a planar Grid and applies a Heightmap-Function to it.
     * @authors Jirka Dell'Oro-Friedl, Simon Storl-Schulke, HFU, 2020
     */
    export class MeshHeightMap extends Mesh {
        private _resolutionX: number;
        private _resolutionZ: number;
        private _heightMapFunction: heightMapFunction;

        public constructor(_resolutionX: number = 16, _resolutionZ: number = 16, _heightMapFunction?: heightMapFunction) {
            super();
            this._resolutionX = _resolutionX;
            this._resolutionZ = _resolutionZ;

            if (_resolutionZ || _resolutionX <= 0) Debug.warn("HeightMap Mesh cannot have resolution values < 1. ");
            
            this._resolutionX = Math.max(1,  this._resolutionX);
            this._resolutionZ = Math.max(1,  this._resolutionZ);

            if (_heightMapFunction) this._heightMapFunction = _heightMapFunction;
            else this._heightMapFunction = function(x, y): number { return 0; }
            
            this.create();
        }
        
        public create(): void {
            this.vertices = this.createVertices();
            this.indices = this.createIndices();
            this.textureUVs = this.createTextureUVs();
            this.normalsFace = this.createFaceNormals();
        }

        protected createVertices(): Float32Array {
            let vertices: Float32Array = new Float32Array((this._resolutionX + 1) * (this._resolutionZ + 1) * 3);

            //Iterate over each cell to generate grid of vertices
            for (let i: number = 0, z: number = 0; z <= this._resolutionZ; z++) {
                for (let x: number = 0; x <= this._resolutionX; x++) {
                    // X
                    vertices[i] = x / this._resolutionX - 0.5;
                    // Apply heightmap to y coordinate
                    vertices[i + 1] = this._heightMapFunction(x / this._resolutionX, z / this._resolutionZ);
                    // Z
                    vertices[i + 2] = z / this._resolutionZ - 0.5;
                    i += 3;
                }
            }
            return vertices;
        }

        protected createIndices(): Uint16Array {
            let vert: number = 0;
            let tris: number = 0;

            let indices: Uint16Array = new Uint16Array(this._resolutionX * this._resolutionZ * 6);
            for (let z: number = 0; z < this._resolutionZ; z++) {
                for (let x: number = 0; x < this._resolutionX; x++) {

                    // First triangle of each grid-cell
                    indices[tris + 0] = vert + 0;
                    indices[tris + 1] = vert + this._resolutionX + 1;
                    indices[tris + 2] = vert + 1;
                    
                    // Second triangle of each grid-cell
                    indices[tris + 3] = vert + 1;
                    indices[tris + 4] = vert + this._resolutionX + 1;
                    indices[tris + 5] = vert + this._resolutionX + 2;
                    vert++;
                    tris += 6;
                }
                vert++;
            }
            return indices;
        }

        protected createTextureUVs(): Float32Array {
            let textureUVs: Float32Array = new Float32Array(this.indices.length * 2);

            for (let i: number = 0, z: number = 0; z <= this._resolutionZ; z++) {
                for (let x: number = 0; x <= this._resolutionX; x++) {
                    textureUVs[i]    = x / this._resolutionX;
                    textureUVs[i + 1] = z / this._resolutionZ;
                    i += 2;
                }
            }
            return textureUVs;
        }

        protected createFaceNormals(): Float32Array {
            return calculateFaceNormals(this);
        }
    }
}