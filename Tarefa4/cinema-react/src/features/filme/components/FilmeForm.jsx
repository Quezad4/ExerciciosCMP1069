import Input from "../../../components/input/Input"
import Button from "../../../components/buttons/Button";


function FilmeForm({
    variant
}) {
    return (
        <form className={variant}>

            <Input type={"text"}
                variant={"form-control"}
                id={"titulo-filme"}
                placeholder={"Digite o nome do filme"}
                label={"Título"} />

            <div className="form-group mb-4">
                <label className="text-white h4 " htmlFor="descricao-filme">Descrição</label>
                <textarea className="form-control" id="descricao-filme"
                    placeholder="Escreva a descrição do filme" row="3" required></textarea>
            </div>

            <div className="form-group mb-4">
                <label className="text-white h4" htmlFor="genero-filme">Gênero</label>
                <select className="form-control" id="genero-filme">
                    <option>🎭 Drama</option>
                    <option>😂 Comédia</option>
                    <option>🎬 Ação</option>
                    <option>😱 Terror</option>
                    <option>🕵️ Suspense</option>
                    <option>🌌 Ficção Científica</option>
                    <option>🧙 Fantasia </option>
                    <option>💖 Romance</option>
                    <option>🤠 Faroeste</option>
                    <option>👶 Animação</option>
                    <option>🎸 Musical</option>
                    <option>🔍 Policial/Crime</option>
                </select>
            </div>

            <div className="form-group mb-4">
                <label className="text-white h4" htmlFor="classNameificacao-filme">classNameificação Indicativa</label>
                <select className="form-control" id="classNameificacao-filme">
                    <option>Livre</option>
                    <option>10 anos</option>
                    <option>12 anos</option>
                    <option>14 anos</option>
                    <option>16 anos</option>
                    <option>18 anos</option>
                </select>
            </div>


            <Input type={"number"}
                variant={"form-control"}
                id={"duracao-filme"}
                placeholder={"Digite a duração do filme"}
                label={"Duração"} />
            <Input
                type={"date"}
                variant={"form-control"}
                id={"data-filme"}
                label={"Data de Estreia"} />

            <Button
                type={"button"}
                variant={"btn bg-white"}
                texto={"Cancelar"}/>
            <Button
                type={"submit"}
                variant={"btn btn-success"}
                texto={"Salvar"} />
        </form>
    );
}


export default FilmeForm;